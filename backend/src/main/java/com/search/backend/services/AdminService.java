package com.search.backend.services;

import com.search.backend.models.AppUser;
import com.search.backend.models.AppUserRole;
import com.search.backend.models.CommentMongo;
import com.search.backend.repositories.mongo.CommentRepository;
import com.search.backend.repositories.jpa.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public AdminService(CommentRepository commentRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
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

    public List<AppUser> findByUsernameContainingIgnoreCase(String name, int limit) {
        String regex = ".*" + name + ".*";
        List<AppUser> users = userRepository.findByUsernameContainingIgnoreCase(regex);
        return users.stream().limit(limit).toList();
    }

    public ResponseEntity<Object> setUserRole(Integer userId, String roleString) {
        AppUserRole newRole;
        try {
            newRole = AppUserRole.valueOf(roleString.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Недопустимая роль: " + roleString);
        }

        Optional<AppUser> optionalUser = userRepository.findById(userId);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Пользователь с ID " + userId + " не найден.");
        }

        AppUser user = optionalUser.get();
        user.setRole(newRole);
        userRepository.save(user);

        return ResponseEntity.ok("Роль пользователя успешно обновлена на " + newRole.name());
    }

}
