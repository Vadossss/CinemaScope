package com.search.backend.repositories.mongo;

import com.search.backend.models.CommentMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<CommentMongo, String> {

}
