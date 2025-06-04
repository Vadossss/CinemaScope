package com.search.backend.repositories.mongo;

import com.search.backend.models.MovieMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieRepositoryMongo extends MongoRepository<MovieMongo, Long> {
    List<MovieMongo> findByName(String name);
    List<MovieMongo> findByNameRegexIgnoreCase(String name);
//    List<MovieMongo> findByGenre(String genre);  // Найти фильмы по жанру
//    List<MovieMongo> findByYearGreaterThan(int year);
}
