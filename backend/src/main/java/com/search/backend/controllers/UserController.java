package com.search.backend.controllers;

import com.search.backend.models.NewItemToListRequest;
import com.search.backend.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.validation.BindingResult;

/**
 * Контроллер для взаимодействия пользователя с системой.
 */
@Controller
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    /**
     * Конструктор контроллера.
     * @param userService Сервис для работы с пользователем.
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Добавляет элемент в указанную категорию пользователя.
     * @param newItemToListRequest Тело запроса, содержащее userId, itemId и categoryName.
     * @param bindingResult Результат валидации входных данных.
     * @return Возвращает HTTP-ответ со статусом и пояснением к статусу
     */
    @PostMapping("/addItemToList")
    public ResponseEntity<Object> addItemToList(@Valid @RequestBody NewItemToListRequest newItemToListRequest,
                                                BindingResult bindingResult) {
        // Проверяем переданные данные
        if (bindingResult.hasErrors()) {
            return ResponseEntity.status(400).body("New item cannot be null");
        }

        // Передаём данные в сервис для добавления элемента в категорию
        return userService.addItemToList(newItemToListRequest.getUserId(), newItemToListRequest.getItemId(),
                newItemToListRequest.getCategoryName());
    }
}
