package com.search.backend.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class FavoriteGenresRequest {
    private String userId;
    private List<String> favoriteGenres;
}
