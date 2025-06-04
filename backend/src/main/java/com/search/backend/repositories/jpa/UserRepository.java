package com.search.backend.repositories.jpa;

import com.search.backend.models.AppUser;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<AppUser, Integer> {

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    AppUser findByUsername(String username);

    @Transactional
    void deleteByUsername(String username);

    List<AppUser> findByUsernameContainingIgnoreCase(String regex);
}

