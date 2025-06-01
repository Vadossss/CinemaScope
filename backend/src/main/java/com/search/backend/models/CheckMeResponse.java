package com.search.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@AllArgsConstructor
public class CheckMeResponse {
    private String id;
    private String username;
    private String role;
    private boolean hasChosenGenres;
    private Instant lastDismissedGenresAt;
}
