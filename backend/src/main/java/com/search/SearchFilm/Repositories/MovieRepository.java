package com.search.SearchFilm.Repositories;

import com.search.SearchFilm.Models.Movie;
import com.search.SearchFilm.Models.MovieModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
