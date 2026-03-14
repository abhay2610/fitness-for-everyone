package com.ffe.controller;

import com.ffe.model.Progress;
import com.ffe.model.User;
import com.ffe.service.ProgressService;
import com.ffe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@CrossOrigin(origins = "*")
public class ProgressController {

    @Autowired
    private ProgressService progressService;
    
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Progress>> getAllProgress(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(progressService.getProgressByUser(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Progress> getProgressById(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        return progressService.getProgressById(id)
                .filter(progress -> progress.getUser().getId().equals(user.getId()))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Progress> createProgress(@RequestBody Progress progress, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        progress.setUser(user);
        Progress created = progressService.createProgress(progress);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgress(@PathVariable Long id, Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        progressService.getProgressById(id)
                .filter(progress -> progress.getUser().getId().equals(user.getId()))
                .ifPresent(progress -> progressService.deleteProgress(id));
        
        return ResponseEntity.noContent().build();
    }
}
