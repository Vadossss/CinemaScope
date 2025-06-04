package com.search.backend.services;

import com.search.backend.models.CommentMongo;
import com.search.backend.repositories.mongo.CommentRepository;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MongoTemplate mongoTemplate;

    public CommentService(CommentRepository commentRepository, MongoTemplate mongoTemplate) {
        this.commentRepository = commentRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public ResponseEntity<Object> getComments(int movieId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("movieId").is(movieId));
        query.with(Sort.by(Sort.Direction.DESC, "commentId"));
        return ResponseEntity.ok(mongoTemplate.find(query, CommentMongo.class));
    }
}
