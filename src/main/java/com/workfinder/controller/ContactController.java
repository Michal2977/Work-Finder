package com.workfinder.controller;

import com.workfinder.Util.Utility;
import com.workfinder.dto.ContactMessageDto;
import com.workfinder.entity.User;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.request.ContactMessageRequest;
import com.workfinder.request.CreateContactRequest;
import com.workfinder.request.TurnstileRequest;
import com.workfinder.response.ApiResponse;
import com.workfinder.service.impl.AuthServiceImpl;
import com.workfinder.service.impl.ContactServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final AuthServiceImpl authService;
    private final ContactServiceImpl contactService;

    public ContactController(AuthServiceImpl authService, ContactServiceImpl contactService) {
        this.authService = authService;
        this.contactService = contactService;
    }



    @PostMapping("/contact")
    public ResponseEntity<?> sendContactMessage(Authentication authentication, @RequestPart(value = "file",required = false)
    MultipartFile file, @Valid @RequestPart("request")CreateContactRequest request
    , @RequestBody TurnstileRequest turnstileRequest){

        if (!authService.verifyTurnstile(turnstileRequest.getTurnstileToken())){
            return ResponseEntity.badRequest().body(new ApiResponse("Turnstile Verification Failed"));
        }
        User user = authService.findByEmail(authentication.getName());
        try {
            contactService.sendContactMessage(request,file,user);
            return ResponseEntity.ok().body(new ApiResponse("Your message has been sent successfully. Thank you for contacting us"));
        } catch (MessagingException e) {
            return ResponseEntity.internalServerError().body(new ApiResponse("Something went Wrong Try Again Later"));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(new ApiResponse("Something went Wrong Try Again Later"));
        }catch (InvalidFileException e){
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }
    }

    @GetMapping("/my-reports")
    public ResponseEntity<?> findMyReports(Authentication authentication){
        return ResponseEntity.ok(contactService.findMyReports(authentication.getName()));
    }

    @GetMapping("/reports/{id}")
    public ResponseEntity<?> reportsDetails(@PathVariable("id")Long id){
        return ResponseEntity.ok(contactService.findReportsDetailsById(id));
    }

    @PostMapping("/admin-respond")
    public ResponseEntity<?> adminRespond(@RequestPart("request") ContactMessageRequest contactMessageRequest,
                                          @RequestPart(value = "file",required = false) MultipartFile file){
        try {
            contactService.
        }
    }






}
