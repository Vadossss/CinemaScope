package com.search.backend.repositories.mongo;

import com.search.backend.models.PersonMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepositoryMongo extends MongoRepository<PersonMongo, Long> {
    List<PersonMongo> findByName(String name);

}
