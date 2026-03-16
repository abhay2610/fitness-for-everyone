package com.ffe.controller;

import com.ffe.dto.AuthResponse;
import com.ffe.dto.UserProfileUpdateRequest;
import com.ffe.model.User;
import com.ffe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUserProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userService.requireByEmail(email);
        return ResponseEntity.ok(new AuthResponse(
                null,
                user.getEmail(),
                user.getName(),
                user.getAge(),
                user.getHeightCm(),
                user.getWeightKg(),
                user.getSex()
        ));
    }

    @PutMapping("/me")
    public ResponseEntity<AuthResponse> updateCurrentUserProfile(@RequestBody UserProfileUpdateRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userService.updateUserProfile(email, request.getAge(), request.getHeightCm(), request.getWeightKg(), request.getSex(), request.getName());
        return ResponseEntity.ok(new AuthResponse(
                null,
                user.getEmail(),
                user.getName(),
                user.getAge(),
                user.getHeightCm(),
                user.getWeightKg(),
                user.getSex()
        ));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
