package com.search.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.search.backend.models.*;
import com.search.backend.repositories.MovieRepositoryMongo;
import com.search.backend.services.FilmService;
import com.search.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/films")
public class MovieController {

    private final FilmService filmService;
    private final MovieRepositoryMongo movieRepository;
    private final UserService userService;

    public MovieController(FilmService filmService, MovieRepositoryMongo movieRepository, UserService userService) {
        this.filmService = filmService;
        this.movieRepository = movieRepository;
        this.userService = userService;
    }

    @GetMapping("/save")
    public void saveExampleMovie() throws IOException {
        for (int page = 1; page <= 100; page++) {
            String jo = filmService.getFilms(page);
            JsonNode js = (new ObjectMapper()).readTree(jo);
            for (JsonNode j : js.path("docs")) {
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    MovieMongo movie = objectMapper.readValue(j.toString(), MovieMongo.class);
                    movieRepository.save(movie);
                } catch (Exception e) {
                    throw new IOException(e.getMessage());
                }
            }
        }
    }

    @GetMapping("/findByName")
    public List<MovieMongo> findName(@RequestParam String name) {
        return movieRepository.findByName(name);
    }

    @GetMapping("/findByNameRegex")
    public List<MovieMongo> findNameRegex(@RequestParam String name, @RequestParam(defaultValue = "10") int limit) {
        return filmService.searchByNameRegex(name, limit);
    }

    @PostMapping("/getSearchFilms")
    public String getSearchFilms(@RequestBody SearchRequest searchRequest) {
        ArrayList<String> list = searchRequest.getGenresList();
        double ratingLow = searchRequest.getRatingLow();
        double ratingTop = searchRequest.getRatingTop();
        return filmService.searchFilms(list, ratingLow, ratingTop);
    }

    @GetMapping("/movie")
    public List<MovieMongo> getMovies(@RequestBody MovieParamsSearch movieParamsSearch) {
        return filmService.findMoviesInRange(movieParamsSearch);
    }
}
