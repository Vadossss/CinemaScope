package com.search.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
public class CheckMeResponse {
    private String id;
    private String username;
    private String role;
    private Map<Long, UserMongo.Score> scores;
    private boolean hasChosenGenres;
    private Instant lastDismissedGenresAt;
}
