package com.search.backend.services;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.search.backend.models.*;
import com.search.backend.repositories.UserMongoRepository;
import com.search.backend.repositories.UserRepository;
import com.search.backend.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
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

    private ResponseEntity<Object> generateAuthResponse(String user) {
        String accessToken = jwtUtil.generateAccessToken(user);
        String refreshToken = jwtUtil.generateRefreshToken(user);
        ResponseCookie refreshTokenCookie = ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofDays(7))
                .build();

        ResponseCookie accessTokenCookie = ResponseCookie.from("accessToken", accessToken)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofMinutes(30))
                .build();

        AuthResponse authResponse = new AuthResponse(accessToken);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())  // Устанавливаем refreshToken
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())   // Устанавливаем accessToken
                .body(authResponse);
    }

    public ResponseEntity<Object> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails user = (UserDetails) authentication.getPrincipal();
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserMongo userMongo = userMongoRepository.findByUsername(user.getUsername());
        if (userMongo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(new CheckMeResponse(userMongo.getId(), user.getUsername(),
                user.getAuthorities().iterator().next().getAuthority(), userMongo.getScores(),
                userMongo.isHasChosenGenres(), userMongo.getLastDismissedGenresAt()));
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

        return generateAuthResponse(user.getUsername());
    }

    public ResponseEntity<Object> loginUser(LoginRequest loginRequest) {
        if (userRepository.existsByUsername(loginRequest.getUsername())) {
            AppUser user = userRepository.findByUsername(loginRequest.getUsername());
            if (passwordMatches(loginRequest.getPassword(),
                    user.getPassword())) {
                return generateAuthResponse(user.getUsername());
            }
            return ResponseEntity.status(401).body("Неверный логин или пароль");
        }
        return ResponseEntity.status(401).body("Неверный логин или пароль");
    }

    public ResponseEntity<Object> updateRefreshToken(HttpServletRequest request) {
        String refreshToken = null;

        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null) {
            return ResponseEntity.status(401).body("Refresh token not found");
        }

        try {
            DecodedJWT decodedJWT = jwtUtil.validateToken(refreshToken);

            String username = decodedJWT.getSubject();
            return generateAuthResponse(username);
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
