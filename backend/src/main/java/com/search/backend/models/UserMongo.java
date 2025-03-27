package com.search.backend.models;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "users")
@Getter
@Setter
public class UserMongo {
    @Id
    private String id;
    private String username;
    private Map<String, List<String>> categories = new HashMap<>();
}
