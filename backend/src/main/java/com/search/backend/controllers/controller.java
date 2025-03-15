package com.search.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.search.backend.models.*;
import com.search.backend.repositories.MovieRepositoryMongo;
import com.search.backend.services.filmService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/films")
public class controller {

    private final filmService filmService;
    private final MovieRepositoryMongo movieRepository;

    public controller(filmService filmService, MovieRepositoryMongo movieRepository) {
        this.filmService = filmService;
        this.movieRepository = movieRepository;
    }

    @GetMapping("/save")
    public void saveExampleMovie() throws IOException {
        for (int page = 2; page <= 190 ; page++) {
            String jo = filmService.getFilms(page);
            JsonNode js = (new ObjectMapper()).readTree(jo);
            for (JsonNode j : js.path("docs")) {
//            System.out.println(j.get("id").asInt());
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    MovieMongo movie = objectMapper.readValue(j.toString(), MovieMongo.class); // Десериализация JSON
                    movieRepository.save(movie);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }

//        String json = "{ \"id\": 5405057, \"name\": \"Анора\", \"year\": 2024, \"description\": \"Описание...\", \"genres\": [{ \"name\": \"драма\" }], \"countries\": [{ \"name\": \"США\" }] }";
//        filmService.saveMovie(json);
//        try {
//            ObjectMapper objectMapper = new ObjectMapper();
//            MovieMongo movie = objectMapper.readValue(json, MovieMongo.class); // Десериализация JSON
//            movieRepository.save(movie);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
    }

    @PostMapping("/newScoreForFilm")
    public ResponseEntity<String> newScore(@RequestBody ScoreRequest scoreRequest) {
        long id = scoreRequest.getId();
        int score = scoreRequest.getScore();
        filmService.updateMovieScore(id, score);
//        Optional<MovieMongo> movie = movieRepository.findById(id);
//        if (movie.isPresent()) {
//            if (movie.get().getVotes().getVote() == 0) {
//                MovieMongo.Rating newRating = movie.get().getRating();
//                MovieMongo.Votes newVotes = movie.get().getVotes();
//                if (newRating != null) {
//                    newRating.setRate(score * 1.0);
//                    movie.get().setRating(newRating);
//                }
//                newVotes.setVote(newVotes.getVote() + 1);
//                movie.get().setVotes(newVotes);
//            }
//            else {
//                double oldRating = movie.get().getRating().getRate();
//                int oldVotes = movie.get().getVotes().getVote();
//                double newScore = (oldRating * oldVotes + score * 1.0) / (oldVotes + 1);
//                MovieMongo.Rating newRating = movie.get().getRating();
//                MovieMongo.Votes newVotes = movie.get().getVotes();
//                if (newRating != null) {
//                    newRating.setRate(Math.round(newScore * 10.0) / 10.0);
//                    movie.get().setRating(newRating);
//                }
//                newVotes.setVote(oldVotes + 1);
//                movie.get().setVotes(newVotes);
//            }
//            movieRepository.save(movie.get());
//            return ResponseEntity.ok("Оценка успешно поставлена");
//        }
        return ResponseEntity.ok("Оценка успешно обновлена");
    }

    @GetMapping("/findByName")
    public List<MovieMongo> findName(@RequestParam String name) {
        return movieRepository.findByName(name);
    }

    @GetMapping("/findByNameRegex")
    public List<MovieMongo> findNameRegex(@RequestParam String name, @RequestParam(defaultValue = "10") int limit) {
        return filmService.searchByNameRegex(name, limit);
    }

    @GetMapping("/parsing")
    public void parseFilm() {
        filmService.parsing();
    }

//    @PostMapping("/getFilms")
//    public String getFilms() throws IOException {
//        String jo = filmService.getFilms();
//        return jo;
//    }

    @PostMapping("/getSearchFilms")
    public String getSearchFilms(@RequestBody SearchRequest searchRequest) throws IOException {
        ArrayList<String> list = searchRequest.getGenresList();
        double ratingLow = searchRequest.getRatingLow();
        double ratingTop = searchRequest.getRatingTop();
        String jo = filmService.searchFilms(list, ratingLow, ratingTop);

        return jo;
    }

    @GetMapping("/movie")
    public List<MovieMongo> getMovies(@RequestBody MovieParamsSearch movieParamsSearch) {
        return filmService.findMoviesInRange(movieParamsSearch);
    }
}
