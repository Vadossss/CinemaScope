package com.search.backend.repositories;

import com.search.backend.models.MovieMongo;
import com.search.backend.models.PersonMongo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PersonRepositoryMongo extends MongoRepository<PersonMongo, Long> {
    List<PersonMongo> findByName(String name);

}
