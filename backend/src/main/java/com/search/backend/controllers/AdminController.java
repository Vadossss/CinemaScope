package com.search.backend.controllers;

import com.search.backend.models.AppUser;
import com.search.backend.models.ForAdminInfoModel;
import com.search.backend.models.SetRoleRequest;
import com.search.backend.models.UserMongo;
import com.search.backend.repositories.UserRepository;
import com.search.backend.services.AdminService;
import org.apache.kafka.clients.admin.Admin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    private UserRepository userRepository;

    public AdminController(AdminService adminService, UserRepository userRepository) {
        this.adminService = adminService;
        this.userRepository = userRepository;
    }

    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN')")
    @DeleteMapping("/deleteComment")
    public ResponseEntity<String> deleteComment(@RequestParam String id) {
        return adminService.deleteComment(id);
    }

    @GetMapping("/findByName")
    public List<ForAdminInfoModel> findByName(@RequestParam String name, @RequestParam(defaultValue = "10") int limit) {
        List<AppUser> users = userRepository.findByUsernameContainingIgnoreCase(name)
                .stream().limit(limit).toList();

        return users.stream()
                .map(user -> new ForAdminInfoModel(user.getId(), user.getUsername(), user.getRole()))
                .collect(Collectors.toList());
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/setRole")
    public ResponseEntity<Object> setUserRole(@RequestBody SetRoleRequest setRoleRequest) {
        return adminService.setUserRole(setRoleRequest.getUserId(), setRoleRequest.getRole());
    }


}
