package com.search.backend.repositories;

import com.search.backend.models.CommentMongo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<CommentMongo, Long> {

}
