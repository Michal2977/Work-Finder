package com.workfinder.controller;


import com.workfinder.entity.User;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.request.CreateJobOfferRequest;
import com.workfinder.response.ApiResponse;
import com.workfinder.service.impl.AuthServiceImpl;
import com.workfinder.service.impl.JobsServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;




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
    public ResponseEntity<?> createJobOffer(@RequestPart("request") CreateJobOfferRequest request,
                                            Authentication authentication,
                                            @RequestPart(value = "file",required = false)MultipartFile file)  {

        User user = authService.findByEmail(authentication.getName());

        try {
            jobsService.createAJobOffer(request,user.getEmail(),file);
            return ResponseEntity.ok(new ApiResponse("Job offer created successfully."));
        }catch (InvalidFileException e){
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        } catch (Exception e) {
           return ResponseEntity.internalServerError().body(new ApiResponse("Something Went wrong try again later"));
        }
    }

}
