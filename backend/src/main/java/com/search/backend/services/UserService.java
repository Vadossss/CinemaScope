package com.search.backend.services;

import com.mongodb.client.result.UpdateResult;
import com.search.backend.models.*;
import com.search.backend.repositories.CommentRepository;
import com.search.backend.repositories.MovieRepositoryMongo;
import com.search.backend.repositories.UserMongoRepository;
import com.search.backend.repositories.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Сервис для взаимодействия пользователя с системой
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMongoRepository userMongoRepository;
    private final FilmService filmService;
    private final MongoTemplate mongoTemplate;
    private final CommentRepository commentRepository;
    private final MovieRepositoryMongo movieRepository;

    /**
     * Конструктор сервиса пользователя
     * @param userMongoRepository Репозиторий для работы с пользователем в MongoDB.
     */

    public UserService(UserRepository userRepository, UserMongoRepository userMongoRepository, FilmService filmService, MongoTemplate mongoTemplate, CommentRepository commentRepository, MovieRepositoryMongo movieRepository) {
        this.userRepository = userRepository;
        this.userMongoRepository = userMongoRepository;
        this.filmService = filmService;
        this.mongoTemplate = mongoTemplate;
        this.commentRepository = commentRepository;
        this.movieRepository = movieRepository;
    }

    public UserDetails getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetails) authentication.getPrincipal();
    }

    public ResponseEntity<Object> getUserProfile(String userId) {
        Optional<UserMongo> userOptional = userMongoRepository.findById(userId);
        if (userOptional.isEmpty()) {
            return ResponseEntity.status(404).body("Мы не нашли такую персону :(");
        }

        UserMongo user = userOptional.get();

        Set<Long> allMovieIds = new HashSet<>();

        // Добавляем фильмы из категорий
        user.getCategories().forEach((category, ids) -> {
            ids.stream()
                    .map(Long::valueOf)
                    .forEach(allMovieIds::add);
        });

        // Добавляем фильмы из оценок
        allMovieIds.addAll(user.getScores().keySet());

        // Шаг 2: получить фильмы из базы
        List<MovieMongo> movies = movieRepository.findAllById(allMovieIds);

        // Шаг 3: создать Map<ID, Movie> для быстрого доступа
        Map<Long, MovieMongo> movieMap = movies.stream()
                .collect(Collectors.toMap(MovieMongo::getId, Function.identity()));

        // Шаг 4: разбираем фильмы по категориям
        Map<String, List<MovieMongo>> categorizedMovies = new HashMap<>();
        user.getCategories().forEach((category, idStrings) -> {
            List<MovieMongo> categoryMovies = idStrings.stream()
                    .map(idStr -> {
                        try {
                            return Long.valueOf(idStr); // преобразуем String в Long
                        } catch (NumberFormatException e) {
                            return null; // или логируй ошибку
                        }
                    })
                    .filter(Objects::nonNull)
                    .map(movieMap::get) // ищем по Long
                    .filter(Objects::nonNull)
                    .collect(Collectors.toList());

            categorizedMovies.put(category, categoryMovies);
        });

        // Шаг 5: собираем фильмы с оценками
        List<Map<String, Object>> scoredMovies = user.getScores().entrySet().stream()
                .map(entry -> {
                    MovieMongo movie = movieMap.get(entry.getKey());
                    if (movie == null) return null;

                    return Map.of(
                            "movie", movie,
                            "scoreData", entry.getValue()
                    );
                })
                .filter(Objects::nonNull)
                .collect(Collectors.toList());

        // Шаг 6: собрать финальный ответ
        Map<String, Object> response = new HashMap<>();
        response.put("user", user.getUsername());
        response.put("favoriteGenres", user.getFavoriteGenres());
        response.put("categorizedMovies", categorizedMovies);
        response.put("scoredMovies", scoredMovies);

        return ResponseEntity.ok(response);
    }

    public List<MovieMongo> recommendationForUser() {
        UserDetails currentUser = getCurrentUser();
        UserMongo userMongo = userMongoRepository.findByUsername(currentUser.getUsername());
        List<String> favoriteGenres = userMongo.getFavoriteGenres();
        MovieParamsSearch movieParamsSearch = new MovieParamsSearch();
//        movieParamsSearch.setGenres(favoriteGenres);
        movieParamsSearch.setVotesKp("1000");
        return filmService.findMoviesInRange(movieParamsSearch);
    }

    public ResponseEntity<Object> addScoreForUser(long id, int score) {
        UserDetails userDetails = getCurrentUser();
        UserMongo userMongo = userMongoRepository.findByUsername(userDetails.getUsername());
        if (userMongo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Map<Long, UserMongo.Score> scores = userMongo.getScores();
        Query query = new Query(Criteria.where("_id").is(id));
        if (scores.containsKey(id)) {
            Update update = new Update()
                    .set("rating.rate", calculateOldRating(id, score, scores.get(id).getScore()));
            mongoTemplate.updateFirst(query, update, MovieMongo.class);
            scores.remove(id);
            scores.put(id, new UserMongo.Score(score));
            userMongo.setScores(scores);
            userMongoRepository.save(userMongo);
            return ResponseEntity.ok().body("Оценка обновлена");
        }
        else {
            Update update = new Update()
                    .inc("votes.vote", 1)
                    .set("rating.rate", calculateNewRating(id, score));

            mongoTemplate.updateFirst(query, update, MovieMongo.class);
            scores.put(id, new UserMongo.Score(score));
            userMongo.setScores(scores);
            userMongoRepository.save(userMongo);
            return ResponseEntity.ok().body("Оценка добавлена");
        }
    }

    public ResponseEntity<Object> addCommentForUser(Long id, String comment) {
        UserDetails userDetails = getCurrentUser();
        UserMongo userMongo = userMongoRepository.findByUsername(userDetails.getUsername());
        CommentMongo commentData = new CommentMongo();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d MMMM yyyy 'в' HH:mm", new Locale("ru"));
        String createdAt = LocalDateTime.now().format(formatter);
        commentData.setCreatedAt(createdAt);
        commentData.setComment(comment);
        commentData.setMovieId(id);
        commentData.setUserId(userMongo.getId());
        commentData.setUserName(userMongo.getUsername());
        commentRepository.save(commentData);
        return ResponseEntity.ok().body("Комментарий добавлен");
    }

    public ResponseEntity<Object> toggleReactionForComment(String commentId, boolean isLike) {
        UserDetails userDetails = getCurrentUser();
        UserMongo userMongo = userMongoRepository.findByUsername(userDetails.getUsername());

        if (userMongo == null) {
            return ResponseEntity.status(404).body("Пользователь не найден");
        }

        Query query = new Query(Criteria.where("_id").is(new ObjectId(commentId)));
        CommentMongo comment = mongoTemplate.findOne(query, CommentMongo.class);

        if (comment == null) {
            return ResponseEntity.status(404).body("Комментарий не найден");
        }

        Update update = new Update();
        boolean alreadyReacted = false;

        if (isLike) {
            if (comment.getLikes().contains(userMongo.getId())) {
                update.pull("likes", userMongo.getId());
                alreadyReacted = true;
            } else {
                update.addToSet("likes", userMongo.getId());
                update.pull("dislikes", userMongo.getId());
            }
        } else {
            if (comment.getDislikes().contains(userMongo.getId())) {
                update.pull("dislikes", userMongo.getId());
                alreadyReacted = true;
            } else {
                update.addToSet("dislikes", userMongo.getId());
                update.pull("likes", userMongo.getId());
            }
        }

        UpdateResult result = mongoTemplate.updateFirst(query, update, CommentMongo.class);

        if (result.getMatchedCount() == 0) {
            return ResponseEntity.status(500).body("Ошибка при обновлении реакции");
        }

        // После обновления надо снова получить актуальные данные комментария
        CommentMongo updatedComment = mongoTemplate.findOne(query, CommentMongo.class);

        if (updatedComment == null) {
            return ResponseEntity.status(500).body("Ошибка при получении обновлённого комментария");
        }

        // Формируем ответ
        Map<String, Object> response = new HashMap<>();
        response.put("count", updatedComment.getLikes().size() - updatedComment.getDislikes().size());
//        response.put("dislikes", updatedComment.getDislikes().size());
        response.put("status", alreadyReacted ? "reaction_removed" : (isLike ? "liked" : "disliked"));

        return ResponseEntity.ok(response);
    }

//    public ResponseEntity<Object> uploadPhoto(MultipartFile file) {
//        UserDetails userDetails = getCurrentUser();
//        AppUser user = userRepository.findByUsername(userDetails.getUsername());
//
//        if (user == null) {
//            return ResponseEntity.status(404).body("Пользователь не найден");
//        }
//
//        try {
//            user.setPhoto(file.getBytes());
//            userRepository.save(user);
//
//            return ResponseEntity.ok("Фото успешно загружено");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("Ошибка загрузки фото");
//        }
//    }


//    public ResponseEntity<Object> addLikeForComment(String commentId) {
//        UserDetails userDetails = getCurrentUser();
//        UserMongo userMongo = userMongoRepository.findByUsername(userDetails.getUsername());
//
//        Query query = new Query(Criteria.where("_id").is(new ObjectId(commentId)));
//
//        CommentMongo commentData = mongoTemplate.findOne(query, CommentMongo.class);
//        if (commentData != null) {
//            if (commentData.getLikes().contains(userMongo.getId())) {
//                Update update = new Update().pull("likes", userMongo.getId());
//
//                UpdateResult result = mongoTemplate.updateFirst(query, update, CommentMongo.class);
//
//                if (result.getMatchedCount() > 0) {
//                    return ResponseEntity.ok().body("-");
//                } else {
//                    return ResponseEntity.status(401).body("Ошибка при изменении оценки");
//                }
//            }
//            else {
//                Update update = new Update().addToSet("likes", userMongo.getId());
//
//                UpdateResult result = mongoTemplate.updateFirst(query, update, CommentMongo.class);
//
//                if (result.getMatchedCount() == 0) {
//                    return ResponseEntity.status(401).body("Ошибка при установке оценки");
//                }
//                return ResponseEntity.ok().body("+");
//            }
//        }
//        return ResponseEntity.status(401).body("Ошибка при установке оценки");
//    }
//
//    public ResponseEntity<Object> addDislikeForComment(String commentId) {
//        UserDetails userDetails = getCurrentUser();
//        UserMongo userMongo = userMongoRepository.findByUsername(userDetails.getUsername());
//
//        Query query = new Query(Criteria.where("_id").is(new ObjectId(commentId)));
//
//        CommentMongo commentData = mongoTemplate.findOne(query, CommentMongo.class);
//        if (commentData != null) {
//            if (commentData.getDislikes().contains(userMongo.getId())) {
//                Update update = new Update().pull("dislikes", userMongo.getId());
//
//                UpdateResult result = mongoTemplate.updateFirst(query, update, CommentMongo.class);
//
//                if (result.getMatchedCount() > 0) {
//                    return ResponseEntity.ok().body("+");
//                } else {
//                    return ResponseEntity.status(401).body("Ошибка при изменении оценки");
//                }
//            }
//            else {
//                Update update = new Update().addToSet("dislikes", userMongo.getId());
//
//                UpdateResult result = mongoTemplate.updateFirst(query, update, CommentMongo.class);
//
//                if (result.getMatchedCount() == 0) {
//                    return ResponseEntity.status(401).body("Ошибка при установке оценки");
//                }
//                return ResponseEntity.ok().body("-");
//            }
//        }
//        return ResponseEntity.status(401).body("Ошибка при установке оценки");
//    }

    private double calculateNewRating(long id, int score) {
        MovieMongo movie = mongoTemplate.findOne(new Query(Criteria.where("_id").is(id)), MovieMongo.class);
        if (movie == null) {
            return score;
        }
        double oldRating = movie.getRating().getRate();
        int oldVotes = movie.getVotes().getVote();
        double newScore = (oldRating * oldVotes + score * 1.0) / (oldVotes + 1);
        return Math.round(newScore * 10.0) / 10.0;
    }

    private double calculateOldRating(long id, int score, int oldScore) {
        MovieMongo movie = mongoTemplate.findOne(new Query(Criteria.where("_id").is(id)), MovieMongo.class);
        if (movie == null) {
            return score;
        }
        double oldRating = movie.getRating().getRate();
        int oldVotes = movie.getVotes().getVote();
        double newScore = (oldRating * oldVotes - oldScore + score * 1.0) / (oldVotes);
        return Math.round(newScore * 10.0) / 10.0;
    }

    public ResponseEntity<Object> paginatedFindMovieByParameters(int page, int size) {
        System.out.println(getCurrentUser().getUsername());
            UserMongo user = userMongoRepository.findByUsername(getCurrentUser().getUsername());
        List<String> genres = user.getFavoriteGenres();
        if (genres != null && !genres.isEmpty()) {
            Query query = new Query();
            filmService.formatingMultipleParameters(query, genres, "genres.name");
            query.addCriteria(Criteria.where("rating.kp").gte(6));

            long totalElements = mongoTemplate.count(query, MovieMongo.class);

            int totalPages = (int) Math.ceil(totalElements / (double) size);

            query.skip((long) page * size).limit(size);

            List<MovieMongo> movies = mongoTemplate.find(query, MovieMongo.class);

            return ResponseEntity.ok().body(new PaginatedResponse<>(movies, totalElements, totalPages, page, size));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    public ResponseEntity<Object> formingFavoriteUserGenres(String userId, List<String> favoriteGenres) {
        UserDetails userDetails = getCurrentUser();
        UserMongo user = userMongoRepository.findByUsername(userDetails.getUsername());
        if (user != null) {
            user.setFavoriteGenres(favoriteGenres);
            userMongoRepository.save(user);
            return ResponseEntity.ok().body("Success");
        }
        else {
            return ResponseEntity.status(401).body("Ошибка при формировании любимых жанров");
        }
    }

    public List<UserMongo> getUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userMongoRepository.findAll(pageable).getContent();
    }

    /**
     * Метод для добавления элемента (фильм/сериал) в указанную категорию пользователя.
     * Если элемент уже находится в добавляемой категории, то возвращаем ошибку.
     * Перед добавлением элемент удаляется из всех других категорий.
     *
     * @param itemId ID элемента, который добавляем в категорию.
     * @param categoryName Название категории, в которую добавляем элемент.
     * @return Возвращает HTTP-ответ со статусом и пояснением к статусу
     */

    public ResponseEntity<Object> addItemToList(String itemId, String categoryName) {
        UserDetails userDetails = getCurrentUser();
        // Получаем пользователя из mongo, если он не существует, присваиваем null
        UserMongo userMongo = userMongoRepository.findByUsername(userDetails.getUsername());
        if (userMongo == null) {
            return ResponseEntity.status(400).body("User not found");
        }

        // Получаем все категории пользователя
        Map<String, List<String>> categories = userMongo.getCategories();

        // Проверяем, нет ли уже элемента в категории
        if (categories.get(categoryName).contains(itemId)) {
            return ResponseEntity.status(400).body("Item already exists in the list");
        }

        // Удаляем элемент из всех категорий перед добавлением
        for (List<String> list : categories.values()) {
            list.remove(itemId);
        }

        // Добавляем элемент в категорию
        userMongo.getCategories().get(categoryName).add(itemId);

        // Сохраняем изменения в базу данных
        userMongoRepository.save(userMongo);

        return ResponseEntity.status(200).body("Successfully added item to list");
    }
}
