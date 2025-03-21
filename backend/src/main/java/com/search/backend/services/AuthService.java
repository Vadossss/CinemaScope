package com.search.backend.services;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.search.backend.models.*;
import com.search.backend.repositories.UserRepository;
import com.search.backend.security.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class AuthService {

    private final JwtUtil jwtUtil;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    private AuthResponse generateAuthResponse(AppUser user) {
        String accessToken = jwtUtil.generateAccessToken(user.getUsername());
        String refreshToken = jwtUtil.generateRefreshToken(user.getUsername());
        return new AuthResponse(accessToken, refreshToken);
    }

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

        userRepository.save(user);

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
            String refreshToken = refreshTokenRequest.getRefreshToken();

            DecodedJWT decodedJWT = jwtUtil.validateToken(refreshTokenRequest.getRefreshToken());

            String username = decodedJWT.getSubject();
            String accessToken = jwtUtil.generateAccessToken(username);

            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken));
        }
        catch (JWTVerificationException e) {
            return ResponseEntity.status(401).body("Invalid refresh token");
        }
    }

    private boolean passwordMatches(String password, String hashedPassword) {
        return passwordEncoder.matches(password, hashedPassword);
    }

}
