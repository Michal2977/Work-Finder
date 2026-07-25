package com.workfinder.controller;

import com.workfinder.dto.JobDto;
import com.workfinder.request.CreateJobOfferRequest;
import com.workfinder.response.ApiResponse;
import com.workfinder.service.impl.AuthServiceImpl;
import com.workfinder.service.impl.JobsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class JobsController {

    private final AuthServiceImpl authService;
    private final JobsServiceImpl jobsService;

    public JobsController(AuthServiceImpl authService, JobsServiceImpl jobsService) {
        this.authService = authService;
        this.jobsService = jobsService;
    }

    @GetMapping("/jobs")
    public ResponseEntity<?> jobsPage(Authentication authentication){
        if (authentication != null){
            return ResponseEntity.ok(authService.findByEmailUserDto(authentication.getName()));
        }
        return ResponseEntity.ok(jobsService.jobDtoList());
    }


    @GetMapping("/job")
    public ResponseEntity<?> createJobOfferPage(Authentication authentication){
        return ResponseEntity.ok(authService.findByEmailUserDto(authentication.getName()));
    }

    @PostMapping("/job")
    public ResponseEntity<?> createJobOffer(@RequestBody CreateJobOfferRequest request,Authentication authentication){

        jobsService.createAJobOffer(request,authentication.getName());
        return ResponseEntity.ok(new ApiResponse("Job offer created successfully."));

    }

}
