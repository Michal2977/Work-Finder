package com.workfinder.controller;

import com.workfinder.exception.AlreadyAppliedException;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.exception.JobNotFoundException;
import com.workfinder.request.FormApplicationAnswerRequest;
import com.workfinder.request.QuickApplicationRequest;
import com.workfinder.response.ApiResponse;
import com.workfinder.service.impl.JobApplicationServiceImpl;
import jakarta.validation.Valid;
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
            return ResponseEntity.ok().body(new ApiResponse("Application sent successfully"));
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

    @GetMapping("/form-application/{id}")
    public ResponseEntity<?>findFormQuestionById(@PathVariable("id")Long id){
        return ResponseEntity.ok(applicationService.findFormQuestionByJobId(id));
    }

    @PostMapping("/send-form-application")
    public ResponseEntity<?> sendFormApplicationByEmployee(@Valid @RequestPart("request")
     FormApplicationAnswerRequest request,Authentication authentication,@RequestPart("file")MultipartFile file){
        try {
            applicationService.formAnswer(request,authentication.getName(),file);
            return ResponseEntity.ok().body(new ApiResponse("Application sent successfully"));
        }catch (InvalidFileException e){
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new ApiResponse("Something Went Wrong Try Again Later"));
        }
    }

    @GetMapping("/find-employee-applications")
    public ResponseEntity<?> findAllEmployeeApplications(Authentication authentication){
        return ResponseEntity.ok(applicationService.findAllJobApplicationForEmployee(authentication.getName()));
    }

    @GetMapping("/all-applications/{id}")
    public ResponseEntity<?> findAllApplicationsForJobs(@PathVariable("id")Long id){
        return ResponseEntity.ok(applicationService.findAllApplications(id));
    }

    @GetMapping("/amounts-of-applications/{id}")
    public ResponseEntity<?> amountOfJobApplications(@PathVariable("id")Long id){
        return ResponseEntity.ok(applicationService.amountsOfJobApplication(id));
    }

    @GetMapping("/count-quick-applications/{id}")
    public ResponseEntity<?> amountsOfQuickApplications(@PathVariable("id")Long id){
        return ResponseEntity.ok(applicationService.amountsOfQuickApplication(id));
    }


    @PutMapping("/reject-candidate/{jobId}/{applicationId}")
    public ResponseEntity<?> rejectCandidate(@PathVariable("jobId")Long jobId,@PathVariable("applicationId") Long applicationId){
        applicationService.RejectACandidate(jobId,applicationId);
        return ResponseEntity.ok().body(new ApiResponse("Candidate rejected"));
    }

    @PutMapping("/viewed-candidate/{jobId}/{applicationId}")
    public  ResponseEntity<?> viewedApplication(@PathVariable("jobId")Long jobId,
                                                @PathVariable("applicationId")Long applicationId){
        applicationService.viewed(jobId,applicationId);
        return ResponseEntity.ok().body(new ApiResponse("Application marked as viewed."));
    }


}
