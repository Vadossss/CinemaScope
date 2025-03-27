package com.search.backend.models;

import lombok.Getter;
import lombok.Setter;

/**
 * Класс для аутентификации пользователя.
 * Хранит логин и пароль пользователя.
 */

@Setter
@Getter
public class LoginRequest {
    private String username;
    private String password;
}
