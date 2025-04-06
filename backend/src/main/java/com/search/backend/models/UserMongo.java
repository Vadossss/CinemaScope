package com.search.backend.models;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
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
    private List<String> favoriteGenres;
    private Map<String, List<String>> categories = new HashMap<>();
    private Map<Long, Integer> scores = new HashMap<>();
}
