package com.search.backend.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.search.backend.models.MovieMongo;
import com.search.backend.models.MovieParamsSearch;
import com.search.backend.repositories.MovieRepositoryMongo;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;

@Service
public class FilmService {

    @Value("${KINO_API_KEY}")
    private String kinoApiKey;

    private final MongoTemplate mongoTemplate;

    private final MovieRepositoryMongo movieRepositoryMongo;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public FilmService(MongoTemplate mongoTemplate, MovieRepositoryMongo movieRepositoryMongo) {
        this.mongoTemplate = mongoTemplate;
        this.movieRepositoryMongo = movieRepositoryMongo;
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
            return score;
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
        if (movieParamsSearch.getReleaseYearsStart() != null && movieParamsSearch.getReleaseYearsEnd() != null) {
            query.addCriteria(Criteria.where("year").gte(movieParamsSearch.getReleaseYearsStart())
            .lte(movieParamsSearch.getReleaseYearsEnd()));
        }
        else if(movieParamsSearch.getReleaseYearsStart() != null) {
            query.addCriteria(Criteria.where("year").gte(movieParamsSearch.getReleaseYearsStart()));
        }
        else if(movieParamsSearch.getReleaseYearsEnd() != null) {
            query.addCriteria(Criteria.where("year").lte(movieParamsSearch.getReleaseYearsEnd()));
        }
        if (movieParamsSearch.getId() != null) {
            query.addCriteria(Criteria.where("_id").is(movieParamsSearch.getId()));
        }
        if (movieParamsSearch.getStatus() != null) {
            formatingMultipleParameters(query, movieParamsSearch.getStatus(), "status");
        }
        if (movieParamsSearch.getTypes() != null) {
            formatingMultipleParameters(query, movieParamsSearch.getTypes(), "type");
        }
        if (movieParamsSearch.getGenres() != null && !movieParamsSearch.getGenres().isEmpty()) {
//            formatingMultipleParameters(query, movieParamsSearch.getGenres(), "genres.name");
            query.addCriteria(Criteria.where("genres.name").all(movieParamsSearch.getGenres()));
        }
//        if (movieParamsSearch.getCountries() != null) {
//            formatingMultipleParameters(query, movieParamsSearch.getCountries(), "countries.name");
//        }
        if (movieParamsSearch.getRatingMpaa() != null) {
            query.addCriteria(Criteria.where("ratingMpaa").is(movieParamsSearch.getRatingMpaa()));
        }
        if (movieParamsSearch.getAgeRating() != null) {
            query.addCriteria(Criteria.where("ageRating").is(movieParamsSearch.getAgeRating()));
        }
        if (movieParamsSearch.getRatingKp() != null) {
            ratingQuery(query, movieParamsSearch.getRatingKp(), "rating.kp");
        }
        if (movieParamsSearch.getRatingImdb() != null) {
            ratingQuery(query, movieParamsSearch.getRatingImdb(), "rating.imdb");
        }
        if (movieParamsSearch.getRatingOwn() != null) {
            ratingQuery(query, movieParamsSearch.getRatingOwn(), "rating.rate");
        }
        return mongoTemplate.find(query, MovieMongo.class);
    }

    private void ratingQuery(Query query, String rating, String source) {
        if (rating.contains("-")) {
            String[] ratingArray = rating.split("-");
            query.addCriteria(Criteria.where(source).gte(Double.valueOf(ratingArray[0])).lte(Double.valueOf(ratingArray[1])));
        }
        else {
            query.addCriteria(Criteria.where(source).gte(Double.valueOf(rating)));
        }
    }

    private void formatingMultipleParameters(Query query, List<String> params, String source) {
        Criteria criteria = new Criteria();
        List<String> includeGenres = new ArrayList<>();
        List<String> excludeGenres = new ArrayList<>();
        for (String type : params) {
            if (type.contains("!")) {
                excludeGenres.add(type.replace("!", ""));
            }
            else {
                System.out.println(type);
                includeGenres.add(type);
            }
        }

        if (!includeGenres.isEmpty() && !excludeGenres.isEmpty()) {
            criteria.andOperator(
                    Criteria.where(source).in(includeGenres),
                    Criteria.where(source).nin(excludeGenres)
            );
        } else if (!includeGenres.isEmpty()) {
            System.out.println("добавляем");
            criteria.and(source).in(includeGenres);
        } else if (!excludeGenres.isEmpty()) {
            System.out.println("исключаем");
            criteria.and(source).nin(excludeGenres);
        }

        if (criteria.getCriteriaObject().isEmpty()) {
            return;
        }

        query.addCriteria(criteria);
    }

    public String getFilms(int page) throws IOException {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
//                .url("https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&selectFields=&type=movie&rating.kp=7-10")
                .url(String.format("https://api.kinopoisk.dev/v1.4/movie?page=%d&limit=10&selectFields=id" +
                        "&selectFields=externalId&selectFields=name&selectFields=name&selectFields=enName" +
                        "&selectFields=alternativeName&selectFields=names&selectFields=description" +
                        "&selectFields=shortDescription&selectFields=slogan&selectFields=type&selectFields=typeNumber" +
                        "&selectFields=typeNumber&selectFields=isSeries&selectFields=status&selectFields=year" +
                        "&selectFields=releaseYears&selectFields=rating&selectFields=ratingMpaa&selectFields=ageRating" +
                        "&selectFields=votes&selectFields=seasonsInfo&selectFields=budget&selectFields=audience" +
                        "&selectFields=movieLength&selectFields=seriesLength&selectFields=totalSeriesLength" +
                        "&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=backdrop" +
                        "&selectFields=logo&selectFields=ticketsOnSale&selectFields=videos&selectFields=networks" +
                        "&selectFields=persons&selectFields=facts&selectFields=fees&selectFields=premiere" +
                        "&selectFields=similarMovies&selectFields=sequelsAndPrequels&selectFields=watchability" +
                        "&selectFields=lists&selectFields=top10&selectFields=top250&selectFields=updatedAt" +
                        "&selectFields=createdAt&id=276261", page))
                .get()
                .addHeader("accept", "application/json")
                .addHeader("X-API-KEY", kinoApiKey)
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
                .addHeader("X-API-KEY", kinoApiKey)
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

    public String encoded(String text) {
        text = "+" + text;
        String encodedResult = null;
        try {
            encodedResult = URLEncoder.encode(text, StandardCharsets.UTF_8.name());
            System.out.println(encodedResult);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
        return encodedResult;
    }
}
