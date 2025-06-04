package com.search.backend.repositories.mongo;

import com.search.backend.models.UserMongo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Репозиторий для работы с пользователями в MongoDB
 */

@Repository
public interface UserMongoRepository extends MongoRepository<UserMongo, Integer> {
    Optional<UserMongo> findById(String userId);

    UserMongo findByUsername(String username);

}
