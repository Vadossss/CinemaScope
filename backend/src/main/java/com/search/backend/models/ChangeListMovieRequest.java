package com.search.backend.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeListMovieRequest {
    private String movieId;
    private String fromCategory;
    private String toCategory;
}
