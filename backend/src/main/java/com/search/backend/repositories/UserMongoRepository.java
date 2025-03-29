package com.search.backend.repositories;

import com.search.backend.models.UserMongo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

/**
 * Репозиторий для работы с пользователями в MongoDB
 */

public interface UserMongoRepository extends MongoRepository<UserMongo, Integer> {
    Optional<UserMongo> findById(String userId);

    UserMongo findByUsername(String username);
}
