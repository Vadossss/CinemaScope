package com.search.backend.models;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Класс для работы с пользователем в MongoDB.
 */
@Document(collection = "users")
@Getter
@Setter
public class UserMongo {
    @Id
    private String id;
    private String username;
    private List<String> favoriteGenres = new ArrayList<>();
    private Map<String, List<String>> categories = new HashMap<>();
    private Map<Long, Score> scores = new HashMap<>();

    @Getter
    @Setter
    public static class Score {
        private int score;
        private LocalDateTime createdAt;

        public Score(int score) {
            this.score = score;
            this.createdAt = LocalDateTime.now();
        }
    }
}