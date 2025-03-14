package com.search.SearchFilm.Services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.search.SearchFilm.Models.Movie;
import com.search.SearchFilm.Models.MovieModel;
import com.search.SearchFilm.Models.MovieMongo;
import com.search.SearchFilm.Models.MovieParamsSearch;
import com.search.SearchFilm.Repositories.MovieRepository;
import com.search.SearchFilm.Repositories.MovieRepositoryMongo;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.core.MongoTemplate;

@Service
public class filmService {

    @Value("${KINO_API_KEY}")
    private String KINO_API_KEY;

    private final MongoTemplate mongoTemplate;

    @Autowired
    private MovieRepository movieRepository;

    private final MovieRepositoryMongo movieRepositoryMongo;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public filmService(MongoTemplate mongoTemplate, MovieRepositoryMongo movieRepositoryMongo) {
        this.mongoTemplate = mongoTemplate;
        this.movieRepositoryMongo = movieRepositoryMongo;
    }

    public void saveMovie(String json) {
        try {
            Movie movie = objectMapper.readValue(json, Movie.class);
            movieRepository.save(movie);
//            System.out.println("Фильм сохранен: " + movie.getName());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void updateMovieScore(long id, int score) {
        Query query = new Query(Criteria.where("_id").is(id));

        Update update = new Update()
                .inc("votes.vote", 1)
                .set("rating.rate", calculateNewRating(id, score));

        mongoTemplate.updateFirst(query, update, MovieMongo.class);
    }


    private double calculateNewRating(long id, int score) {
        MovieMongo movie = mongoTemplate.findOne(new Query(Criteria.where("_id").is(id)), MovieMongo.class);
        if (movie == null) {
            return score;  // Если фильма нет, устанавливаем первый рейтинг
        }
        double oldRating = movie.getRating().getRate();
        int oldVotes = movie.getVotes().getVote();
        double newScore = (oldRating * oldVotes + score * 1.0) / (oldVotes + 1);
        return Math.round(newScore * 10.0) / 10.0;
    }

    public List<MovieMongo> searchByNameRegex(String name, int limit) {
        Criteria criteria = Criteria.where("name").regex(name, "i");
        Query query = new Query(criteria).limit(limit);
        return mongoTemplate.find(query, MovieMongo.class);
    }

    public List<MovieMongo> findMoviesInRange(MovieParamsSearch movieParamsSearch) {
        Query query = new Query().limit(movieParamsSearch.getLimit());
        Criteria criteria = new Criteria();
        if (movieParamsSearch.getReleaseYearsStart() != null && movieParamsSearch.getReleaseYearsEnd() != null) {
            query.addCriteria(Criteria.where("year").gte(movieParamsSearch.getReleaseYearsStart())
            .lte(movieParamsSearch.getReleaseYearsEnd()));
        }
        else if(movieParamsSearch.getReleaseYearsStart() != null) {
            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("YYYY");
            System.out.println(today.format(formatter));
            query.addCriteria(Criteria.where("year").gte(movieParamsSearch.getReleaseYearsStart()));
//                    .lte(today.format(formatter)));
        }
        else if(movieParamsSearch.getReleaseYearsEnd() != null) {
            query.addCriteria(Criteria.where("year").lte(movieParamsSearch.getReleaseYearsEnd()));
        }
        if (movieParamsSearch.getId() != null) {
            query.addCriteria(Criteria.where("_id").is(movieParamsSearch.getId()));
        }
        if (movieParamsSearch.getTypes() != null) {
            List<String> includeGenres = new ArrayList<>();
            List<String> excludeGenres = new ArrayList<>();
            for (String type : movieParamsSearch.getTypes()) {
                if (type.contains("!")) {
                    excludeGenres.add(type.replace("!", ""));
                }
                else {
                    System.out.println(type);
                    includeGenres.add(type);
                }
            }

            if (!includeGenres.isEmpty() && !excludeGenres.isEmpty()) {
                // Включаем жанры из includeGenres и исключаем жанры из excludeGenres
                criteria.andOperator(
                        Criteria.where("type").in(includeGenres),
                        Criteria.where("type").nin(excludeGenres)
                );
            } else if (!includeGenres.isEmpty()) {
                // Только включаем жанры
                System.out.println("добавляем");
                criteria.and("type").in(includeGenres);
            } else if (!excludeGenres.isEmpty()) {
                // Только исключаем жанры
                System.out.println("исключаем");
                criteria.and("type").nin(excludeGenres);
            }

            query.addCriteria(criteria);

//            if (!includeGenres.isEmpty()) {
//                query.addCriteria(Criteria.where("genres").in(includeGenres));
//            }
//
//            // Добавляем условия для исключения жанров
//            if (!excludeGenres.isEmpty()) {
//                query.addCriteria(Criteria.where("genres").nin(excludeGenres));
//            }

            return mongoTemplate.find(query, MovieMongo.class);
        }
        return mongoTemplate.find(query, MovieMongo.class);
    }

    public String getFilms(int page) throws IOException {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
//                .url("https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&selectFields=&type=movie&rating.kp=7-10")
                .url(String.format("https://api.kinopoisk.dev/v1.4/movie?page=%d&limit=250", page))
                .get()
                .addHeader("accept", "application/json")
                .addHeader("X-API-KEY", KINO_API_KEY)
                .build();

        Response response;
        try {
            response = client.newCall(request).execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return response.body().string();
    }
    public String searchFilms(ArrayList<String> arrayList, double ratingLow, double ratingTop) {
//        String url = "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&selectFields=&sortField=&sortType=1&type=movie";
        String url = "https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250";
        String pat = "&genres.name=";
        String rating = "&rating.kp=";

        url += rating + ratingLow + "-" + ratingTop;

        for (String item: arrayList) {
            url += pat + encoded(item);
        }

        System.out.println(url);

        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder()
                .url(url)
                .get()
                .addHeader("accept", "application/json")
                .addHeader("X-API-KEY", KINO_API_KEY)
                .build();

        Response response;
        try {
            response = client.newCall(request).execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        try {

            return response.body().string();

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public void parsing() {
        String json = "{\n" +
                "  \"id\": 5405057,\n" +
                "  \"name\": \"Анора\",\n" +
                "  \"alternativeName\": \"Anora\",\n" +
                "  \"enName\": \"\",\n" +
                "  \"type\": \"movie\",\n" +
                "  \"year\": 2024,\n" +
                "  \"description\": \"Бруклин. Стриптизерша Анора...\",\n" +
                "  \"shortDescription\": \"Сын русского олигарха...\",\n" +
                "  \"movieLength\": 139,\n" +
                "  \"isSeries\": false,\n" +
                "  \"ticketsOnSale\": true,\n" +
                "  \"ratingMpaa\": \"r\",\n" +
                "  \"ageRating\": 18,\n" +
                "  \"externalId\": { \"kpHD\": \"17cee64de8a34309892b79925bc9582f\", \"tmdb\": 1064213 },\n" +
                "  \"poster\": { \"url\": \"https://image.openmoviedb.com/poster.jpg\", \"previewUrl\": \"https://image.openmoviedb.com/preview.jpg\" },\n" +
                "  \"genres\": [{ \"name\": \"драма\" }, { \"name\": \"мелодрама\" }, { \"name\": \"комедия\" }],\n" +
                "  \"countries\": [{ \"name\": \"США\" }]\n" +
                "}";

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Movie movie = objectMapper.readValue(json, Movie.class);

            // Вывод результата
//            System.out.println("Название фильма: " + movie.getName());
//            System.out.println("Год выпуска: " + movie.getYear());
//            System.out.println("Жанры: ");
            movie.getGenres().forEach(genre -> System.out.println("- " + genre.getName()));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String encoded(String text) {
        text = "+" + text;
        String encodedResult = null;
        try {
            encodedResult = URLEncoder.encode(text, StandardCharsets.UTF_8.name());
            System.out.println(encodedResult);
        } catch (UnsupportedEncodingException e) {
            // not going to happen - value came from JDK's own StandardCharsets
            e.printStackTrace();
        }
        return encodedResult;
    }
}
