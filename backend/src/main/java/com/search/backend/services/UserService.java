package com.search.backend.services;

import com.search.backend.models.UserMongo;
import com.search.backend.repositories.UserMongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Сервис для взаимодействия пользователя с системой
 */
@Service
public class UserService {

    private final UserMongoRepository userMongoRepository;

    /**
     * Конструктор сервиса пользователя
     * @param userMongoRepository Репозиторий для работы с пользователем в MongoDB.
     */

    public UserService(UserMongoRepository userMongoRepository) {
        this.userMongoRepository = userMongoRepository;
    }

    /**
     * Метод для добавления элемента (фильм/сериал) в указанную категорию пользователя.
     * Если элемент уже находится в добавляемой категории, то возвращаем ошибку.
     * Перед добавлением элемент удаляется из всех других категорий.
     *
     * @param userId ID пользователя.
     * @param itemId ID элемента, который добавляем в категорию.
     * @param categoryName Название категории, в которую добавляем элемент.
     * @return Возвращает HTTP-ответ со статусом и пояснением к статусу
     */

    public ResponseEntity<Object> addItemToList(String userId, String itemId, String categoryName) {

        // Получаем пользователя из mongo, если он не существует, присваиваем null
        UserMongo userMongo = userMongoRepository.findById(userId)
                .orElse(null);
        if (userMongo == null) {
            return ResponseEntity.status(400).body("User not found");
        }

        // Получаем все категории пользователя
        Map<String, List<String>> categories = userMongo.getCategories();

        // Проверяем, нет ли уже элемента в категории
        if (categories.get(categoryName).contains(itemId)) {
            return ResponseEntity.status(400).body("Item already exists in the list");
        }

        // Удаляем элемент из всех категорий перед добавлением
        for (List<String> list : categories.values()) {
            list.remove(itemId);
        }

        // Добавляем элемент в категорию
        userMongo.getCategories().get(categoryName).add(itemId);

        // Сохраняем изменения в базу данных
        userMongoRepository.save(userMongo);

        return ResponseEntity.status(200).body("Successfully added item to list");
    }
}
