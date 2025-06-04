package com.search.backend.repositories.mongo;

import com.search.backend.models.NewsMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepositoryMongo extends MongoRepository<NewsMongo, Long> {


}
