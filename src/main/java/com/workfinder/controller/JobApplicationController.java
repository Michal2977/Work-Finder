package com.workfinder.controller;

import com.workfinder.exception.JobNotFoundException;
import com.workfinder.response.ApiResponse;
import com.workfinder.service.impl.JobApplicationServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    private final JobApplicationServiceImpl applicationService;

    public JobApplicationController(JobApplicationServiceImpl applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/quick-application/{id}")
    public ResponseEntity<?> quickApplication(Authentication authentication, @PathVariable("id")Long id){
        try {
            applicationService.quickApplication(authentication.getName(),id);
            return ResponseEntity.ok().body(new ApiResponse("Application sent successfully."));
        }catch (JobNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
        }
    }

}
