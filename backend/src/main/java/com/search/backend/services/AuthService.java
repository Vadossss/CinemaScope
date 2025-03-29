package com.search.backend.services;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.search.backend.models.*;
import com.search.backend.repositories.UserMongoRepository;
import com.search.backend.repositories.UserRepository;
import com.search.backend.security.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class AuthService {

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;
    private final UserMongoRepository userMongoRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, UserMongoRepository userMongoRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userMongoRepository = userMongoRepository;
    }

    private AuthResponse generateAuthResponse(AppUser user) {
        String accessToken = jwtUtil.generateAccessToken(user.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());
        return new AuthResponse(accessToken, refreshToken);
    }

    @Transactional
    public ResponseEntity<Object> registerUser(AppUser user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.status(401).body("Username already exists");
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.status(401).body("Email already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(AppUserRole.ROLE_CLIENT);

        AuthResponse authResponse = generateAuthResponse(user);

        AppUser savedUser = userRepository.save(user);

        UserMongo userMongo = new UserMongo();
        userMongo.setUsername(user.getUsername());
        userMongo.setId(String.valueOf(savedUser.getId()));

        Map<String, List<String>> categories = new HashMap<>();
        categories.put("watched", new ArrayList<>());
        categories.put("planned", new ArrayList<>());
        categories.put("dropped", new ArrayList<>());
        categories.put("watching", new ArrayList<>());
        userMongo.setCategories(categories);

        userMongoRepository.save(userMongo);

        return ResponseEntity.ok(authResponse);
    }

    public ResponseEntity<Object> loginUser(LoginRequest loginRequest) {
        if (userRepository.existsByUsername(loginRequest.getUsername())) {
            AppUser user = userRepository.findByUsername(loginRequest.getUsername());
            if (passwordMatches(loginRequest.getPassword(),
                    user.getPassword())) {
                AuthResponse authResponse = generateAuthResponse(user);
                return ResponseEntity.ok(authResponse);
            }
            return ResponseEntity.status(401).body("Username or password is incorrect");
        }
        return ResponseEntity.status(401).body("Username or password is incorrect");
    }

    public ResponseEntity<Object> updateRefreshToken(RefreshTokenRequest refreshTokenRequest) {
        try {

            DecodedJWT decodedJWT = jwtUtil.validateToken(refreshTokenRequest.getRefreshToken());

            String username = decodedJWT.getSubject();
            String accessToken = jwtUtil.generateAccessToken(username);
            String refreshToken = jwtUtil.generateRefreshToken(username);
            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
        }
        catch (JWTVerificationException e) {
            return ResponseEntity.status(401).body("Invalid refresh token");
        }
    }

    private boolean passwordMatches(String password, String hashedPassword) {
        return passwordEncoder.matches(password, hashedPassword);
    }

    public ResponseEntity<Object> setUserRole(Integer userId, String nameRole) {
        AppUser user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).body("User not found");
        }
        user.setRole(AppUserRole.valueOf(nameRole));
        userRepository.save(user);
        return ResponseEntity.ok().body("Successfully updated role");
    }

}
