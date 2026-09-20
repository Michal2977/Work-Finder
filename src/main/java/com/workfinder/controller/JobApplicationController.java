package com.workfinder.controller;

import com.workfinder.dto.QuickApplicationDto;
import com.workfinder.exception.AlreadyAppliedException;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.exception.JobNotFoundException;
import com.workfinder.request.QuickApplicationRequest;
import com.workfinder.response.ApiResponse;
import com.workfinder.service.impl.JobApplicationServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;



@RestController
@RequestMapping("/api/jobs")
public class JobApplicationController {

    private final JobApplicationServiceImpl applicationService;

    public JobApplicationController(JobApplicationServiceImpl applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/quick-application/{id}")
    public ResponseEntity<?> quickApplication(Authentication authentication, @PathVariable("id")Long id
    , @RequestPart("file")MultipartFile file, @RequestPart("request")QuickApplicationRequest request){
        try {
            applicationService.quickApplication(authentication.getName(),id,file,request);
            return ResponseEntity.ok().body(new ApiResponse("Application sent successfully."));
        }catch (JobNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(e.getMessage()));
        } catch (InvalidFileException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }catch (AlreadyAppliedException e){
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }
        catch (Exception e) {
           return ResponseEntity.internalServerError().body(new ApiResponse("Something Went Wrong try again later"));
        }
    }

}
