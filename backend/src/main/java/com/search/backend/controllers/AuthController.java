package com.search.backend.controllers;

import com.search.backend.models.AppUser;
import com.search.backend.models.LoginRequest;
import com.search.backend.models.SetRoleRequest;
import com.search.backend.services.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        return authService.loginUser(loginRequest);
    }

    @GetMapping("/me")
    public ResponseEntity<Object> getCurrentUser() {
        return authService.getCurrentUser();
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register(@RequestBody AppUser user) {
        return authService.registerUser(user);
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        // Очистка куки с токеном
        Cookie cookie = new Cookie("accessToken", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);  // Только по https
        cookie.setPath("/");  // Применяется ко всем путям
        cookie.setMaxAge(0);  // Устанавливаем срок действия куки в 0 (удаление)
        response.addCookie(cookie);

        Cookie cookier = new Cookie("refreshToken", null);
        cookier.setHttpOnly(true);
        cookier.setSecure(true);  // Только по https
        cookier.setPath("/");  // Применяется ко всем путям
        cookier.setMaxAge(0);  // Устанавливаем срок действия куки в 0 (удаление)
        response.addCookie(cookier);

        // Инвалидируем сессию
        request.getSession().invalidate();

        // Перенаправляем на страницу логина
        return "redirect:/login";
    }

    @PostMapping("/updateRefreshToken")
    public ResponseEntity<Object> updateRefreshToken(HttpServletRequest request) {
        return authService.updateRefreshToken(request);
    }



    @GetMapping("/debugRoles")
    public ResponseEntity<?> debugRoles(Authentication authentication) {
        return ResponseEntity.ok(authentication.getAuthorities());
    }
}

