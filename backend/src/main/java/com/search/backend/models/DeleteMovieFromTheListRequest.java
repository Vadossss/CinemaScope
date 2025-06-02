package com.search.backend.models;

import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
public class DeleteMovieFromTheListRequest {
    private String movieId;
    private String fromCategory;
}
