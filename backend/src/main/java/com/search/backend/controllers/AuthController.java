package com.search.backend.controllers;

import com.search.backend.models.AppUser;
import com.search.backend.models.LoginRequest;
import com.search.backend.models.RefreshTokenRequest;
import com.search.backend.models.SetRoleRequest;
import com.search.backend.services.AuthService;
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

    @PostMapping("/updateRefreshToken")
    public ResponseEntity<Object> updateRefreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.updateRefreshToken(refreshTokenRequest);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/setRole")
    public ResponseEntity<Object> setUserRole(@RequestBody SetRoleRequest setRoleRequest) {
        return authService.setUserRole(setRoleRequest.getUserId(), setRoleRequest.getRole());
    }

    @GetMapping("/debugRoles")
    public ResponseEntity<?> debugRoles(Authentication authentication) {
        return ResponseEntity.ok(authentication.getAuthorities());
    }
}

