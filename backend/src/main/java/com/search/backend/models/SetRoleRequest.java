package com.search.backend.models;

import lombok.Getter;
import lombok.Setter;

/**
 * Класс для смены роли пользователя.
 * Хранит ID пользователя и название роли.
 */

@Getter
@Setter
public class SetRoleRequest {
    private Integer userId;
    private String role;
}
