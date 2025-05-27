package com.search.backend.repositories;

import com.search.backend.models.PersonMongo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PersonRepositoryMongo extends MongoRepository<PersonMongo, Long> {

}
