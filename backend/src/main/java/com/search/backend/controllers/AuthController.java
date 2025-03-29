package com.search.backend.controllers;

import com.search.backend.models.AppUser;
import com.search.backend.models.LoginRequest;
import com.search.backend.models.RefreshTokenRequest;
import com.search.backend.models.SetRoleRequest;
import com.search.backend.services.AuthService;
import com.search.backend.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody LoginRequest loginRequest) {
        return authService.loginUser(loginRequest);
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

    @GetMapping("/current-user")
    public UserDetails getCurrentUser() {
        return userService.getCurrentUser();
    }
}

