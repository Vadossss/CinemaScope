package com.search.backend.services;

import com.search.backend.models.*;
import com.search.backend.repositories.UserMongoRepository;
import com.search.backend.security.MyUserDetails;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Сервис для взаимодействия пользователя с системой
 */
@Service
public class UserService {

    private final UserMongoRepository userMongoRepository;
    private final FilmService filmService;
    private final MongoTemplate mongoTemplate;

    /**
     * Конструктор сервиса пользователя
     * @param userMongoRepository Репозиторий для работы с пользователем в MongoDB.
     */

    public UserService(UserMongoRepository userMongoRepository, FilmService filmService, MongoTemplate mongoTemplate) {
        this.userMongoRepository = userMongoRepository;
        this.filmService = filmService;
        this.mongoTemplate = mongoTemplate;
    }

    public UserDetails getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetails) authentication.getPrincipal();
    }

    public ResponseEntity<Object> addScoreForUser(long id, int score) {
        UserDetails userDetails = getCurrentUser();
        UserMongo userMongo = userMongoRepository.findByUsername(userDetails.getUsername());
        if (userMongo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        Map<Long, Integer> scores = userMongo.getScoresMap();
        Query query = new Query(Criteria.where("_id").is(id));
        if (scores.containsKey(id)) {
            Update update = new Update()
                    .set("rating.rate", calculateOldRating(id, score, scores.get(id)));
            mongoTemplate.updateFirst(query, update, MovieMongo.class);
            scores.remove(id);
            scores.put(id, score);
            userMongo.setScoresMap(scores);
            userMongoRepository.save(userMongo);
            return ResponseEntity.ok().body("Оценка обновлена");
        }
        else {
            Update update = new Update()
                    .inc("votes.vote", 1)
                    .set("rating.rate", calculateNewRating(id, score));

            mongoTemplate.updateFirst(query, update, MovieMongo.class);
            scores.put(id, score);
            userMongo.setScoresMap(scores);
            userMongoRepository.save(userMongo);
            return ResponseEntity.ok().body("Оценка добавлена");
        }
    }

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

            long totalElements = mongoTemplate.count(query, MovieMongo.class);

            int totalPages = (int) Math.ceil(totalElements / (double) size);

            query.skip((long) page * size).limit(size);

            List<MovieMongo> movies = mongoTemplate.find(query, MovieMongo.class);

            return ResponseEntity.ok().body(new PaginatedResponse<>(movies, totalElements, totalPages, page, size));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    public ResponseEntity<Object> formingFavoriteUserGenres(String userId, List<String> favoriteGenres) {
        Optional<UserMongo> user = userMongoRepository.findById(userId);
        user.get().setFavoriteGenres(favoriteGenres);
        userMongoRepository.save(user.get());
        return ResponseEntity.ok().body("Success");
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
     * @param userId ID пользователя.
     * @param itemId ID элемента, который добавляем в категорию.
     * @param categoryName Название категории, в которую добавляем элемент.
     * @return Возвращает HTTP-ответ со статусом и пояснением к статусу
     */

    public ResponseEntity<Object> addItemToList(String userId, String itemId, String categoryName) {

        // Получаем пользователя из mongo, если он не существует, присваиваем null
        UserMongo userMongo = userMongoRepository.findById(userId)
                .orElse(null);
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
