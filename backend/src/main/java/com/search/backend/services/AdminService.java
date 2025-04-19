package com.search.backend.services;

import com.search.backend.models.CommentMongo;
import com.search.backend.repositories.CommentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private final CommentRepository commentRepository;

    public AdminService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public ResponseEntity<String> deleteComment(String id) {
        Optional<CommentMongo> commentMongo = commentRepository.findById(id);
        if (commentMongo.isPresent()) {
            commentRepository.deleteById(id);
            return ResponseEntity.ok("Комментарий удалён");
        }
        else {
            return ResponseEntity.status(404).body("Комментарий не найден");
        }
    }
}
