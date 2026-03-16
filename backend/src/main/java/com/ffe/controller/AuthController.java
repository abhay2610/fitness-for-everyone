package com.ffe.controller;

import com.ffe.dto.AuthResponse;
import com.ffe.dto.LoginRequest;
import com.ffe.dto.RegisterRequest;
import com.ffe.model.User;
import com.ffe.security.JwtTokenProvider;
import com.ffe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            if (userService.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest().body("Email already exists");
            }
            
            User user = new User();
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setName(request.getName());
            user.setAge(request.getAge());
            user.setHeightCm(request.getHeightCm());
            user.setWeightKg(request.getWeightKg());
            user.setSex(request.getSex());
            
            User savedUser = userService.createUser(user);
            String token = tokenProvider.generateToken(savedUser.getEmail());
            
            return ResponseEntity.ok(new AuthResponse(
                    token,
                    savedUser.getEmail(),
                    savedUser.getName(),
                    savedUser.getAge(),
                    savedUser.getHeightCm(),
                    savedUser.getWeightKg(),
                    savedUser.getSex()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Registration failed: " + e.getMessage());
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            
            String token = tokenProvider.generateToken(request.getEmail());
            User user = userService.getUserByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            
            return ResponseEntity.ok(new AuthResponse(
                    token,
                    user.getEmail(),
                    user.getName(),
                    user.getAge(),
                    user.getHeightCm(),
                    user.getWeightKg(),
                    user.getSex()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }
}
