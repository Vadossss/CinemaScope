package com.search.backend.models;

import lombok.Getter;
import lombok.Setter;

/**
 * Класс для работы с refresh токеном
 */
@Getter
@Setter
public class RefreshTokenRequest {
    private String refreshToken;
}
