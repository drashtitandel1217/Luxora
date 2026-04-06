package com.luxora.luxora_backend.controller;

import com.luxora.luxora_backend.model.User;
import com.luxora.luxora_backend.repository.UserRepository;
import com.luxora.luxora_backend.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SessionRepository sessionRepository; // Tracks active sessions

    @GetMapping("/active-buyers")
    public List<User> getActiveBuyers() {
        // Get IDs of users currently logged in
        List<Long> activeUserIds = sessionRepository.findActiveUserIds();

        // Return only buyers
        return userRepository.findByIdInAndRole(activeUserIds, "Buyer");
    }
}