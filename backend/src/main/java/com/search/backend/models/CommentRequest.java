package com.search.backend.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequest {
    private Long id;
    private String comment;
}
