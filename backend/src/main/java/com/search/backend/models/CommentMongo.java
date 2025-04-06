package com.search.backend.models;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "comments")
@Getter
@Setter
public class CommentMongo {
    @Id
    private Long commentId;

    private Long movieId;

    private String userId;
    private String userName;
    private String comment;

    @CreationTimestamp
    private LocalDateTime createdAt;

    Set<String> likes = new HashSet<>();
    Set<String> dislikes = new HashSet<>();
}
