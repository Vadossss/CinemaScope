package com.search.backend.models;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.HashSet;
import java.util.Set;

@Document(collection = "comments")
@Getter
@Setter
public class CommentMongo {
    @Id
    @Field("_id")
    private String commentId;

    private Long movieId;

    private String userId;
    private String userName;
    private String comment;

    private String createdAt;

    Set<String> likes = new HashSet<>();
    Set<String> dislikes = new HashSet<>();
}
