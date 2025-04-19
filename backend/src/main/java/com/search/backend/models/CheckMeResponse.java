package com.search.backend.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class CheckMeResponse {
    private String id;
    private String username;
    private String role;
}
