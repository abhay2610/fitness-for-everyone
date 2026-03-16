package com.ffe.controller;

import com.ffe.dto.ChatRequest;
import com.ffe.dto.ChatResponse;
import com.ffe.model.User;
import com.ffe.service.ChatService;
import com.ffe.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<ChatResponse> chat(@RequestBody ChatRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = null;
        if (auth != null && auth.isAuthenticated() && auth.getName() != null && !"anonymousUser".equalsIgnoreCase(auth.getName())) {
            user = userService.requireByEmail(auth.getName());
        }
        String reply = chatService.buildReply(user, request.getMessage());
        return ResponseEntity.ok(new ChatResponse(reply));
    }
}
