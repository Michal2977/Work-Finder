package com.workfinder.controller;


import com.workfinder.dto.JobDto;
import com.workfinder.entity.User;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.request.CreateJobOfferRequest;
import com.workfinder.request.UpdateJobOfferRequest;
import com.workfinder.response.ActionResponse;
import com.workfinder.response.ApiResponse;
import com.workfinder.response.UpdateJobResponse;
import com.workfinder.service.impl.AuthServiceImpl;
import com.workfinder.service.impl.JobsServiceImpl;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
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


    @GetMapping("/create-job")
    public ResponseEntity<?> createJobOfferPage(Authentication authentication){
        return ResponseEntity.ok(authService.findByEmailUserDto(authentication.getName()));
    }

    @PostMapping("/create-job")
    public ResponseEntity<?> createJobOffer(@Valid @RequestPart("request") CreateJobOfferRequest request,
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

    @GetMapping("/jobs/{id}")
    public ResponseEntity<?> getOfferById(@PathVariable("id") Long id){
        return ResponseEntity.ok(jobsService.findJobById(id));
    }

    @GetMapping("/update-job/{id}")
    public ResponseEntity<?> getJobOfferUpdate(@PathVariable("id")Long id,Authentication authentication){
        try {
            User user = authService.findByEmail(authentication.getName());
            JobDto jobDto = jobsService.findJobOfferById(id,user);
            return ResponseEntity.ok(jobDto);
        }catch (AccessDeniedException e){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse(e.getMessage()));
        }
    }

    @PutMapping("/update-job/{id}")
    public ResponseEntity<?> updateJobOffer(@PathVariable("id") Long id, Authentication  authentication,
                                            @RequestPart(value = "file", required = false) MultipartFile file,
                                           @Valid @RequestPart("request")UpdateJobOfferRequest request){

        try {
            JobDto jobDto =  jobsService.updateJobOffer(id,request,authentication.getName(),file);
           return ResponseEntity.ok(new UpdateJobResponse("Information has been updated",jobDto));
        }catch (InvalidFileException e){
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new ApiResponse("Something went Wrong Try again Later"));
        }

    }

}
