package com.search.backend.repositories;

import com.search.backend.models.NewsMongo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NewsRepositoryMongo extends MongoRepository<NewsMongo, Long> {

}
