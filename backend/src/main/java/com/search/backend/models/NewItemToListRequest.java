package com.search.backend.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 * Класс для работы с коллекциями пользователя.
 * Хранит информацию об идентификаторе пользователя, названии коллекции и добавляемому элементу в коллекцию.
 */
@Getter
@Setter
public class NewItemToListRequest {
    @NotBlank
    @NotNull
    private String userId;

    @NotBlank
    @NotNull
    private String itemId;

    @NotBlank
    @NotNull
    private String categoryName;
}
