package com.search.backend.controllers;

import com.search.backend.models.UpdateLoginRequest;
import com.search.backend.services.UserSettingsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user_settings")
public class UserSettingsController {

    private final UserSettingsService userSettingsService;

    @Autowired
    public UserSettingsController(UserSettingsService userSettingsService) {
        this.userSettingsService = userSettingsService;
    }

    @PostMapping("/uploadAvatar")
    public ResponseEntity<Object> uploadAvatar(@RequestParam("file") MultipartFile file) {
        return userSettingsService.uploadAvatar(file);
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity<Resource> downloadAvatar(@PathVariable String fileName, HttpServletRequest request) {
        return userSettingsService.downloadAvatar(fileName, request);
    }

    @PostMapping("/updateLogin")
    public ResponseEntity<Object> updateLogin(@RequestBody UpdateLoginRequest updateLoginRequest) {
        return userSettingsService.updateLogin(updateLoginRequest);
    }
}
