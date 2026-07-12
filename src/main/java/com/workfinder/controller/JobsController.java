package com.workfinder.controller;

import com.workfinder.service.impl.AuthServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class JobsController {

    private final AuthServiceImpl authService;

    public JobsController(AuthServiceImpl authService) {
        this.authService = authService;
    }

    @GetMapping("/jobs")
    public ResponseEntity<?> jobsPage(Authentication authentication){
        if (authentication != null){
            return ResponseEntity.ok(authService.findByEmailUserDto(authentication.getName()));
        }
        return ResponseEntity.ok(null);
    }
}
