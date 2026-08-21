package com.workfinder.controller;

import com.workfinder.Util.Utility;
import com.workfinder.dto.ContactMessageDto;
import com.workfinder.entity.User;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.exception.UserMessageNotAllowedException;
import com.workfinder.request.ContactMessageRequest;
import com.workfinder.request.CreateContactRequest;
import com.workfinder.request.TurnstileRequest;
import com.workfinder.response.ApiResponse;
import com.workfinder.security.PrincipalUser;
import com.workfinder.service.impl.AuthServiceImpl;
import com.workfinder.service.impl.ContactServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
    , @RequestPart("turnstileRequest") TurnstileRequest turnstileRequest){

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

    @PostMapping("/admin-respond/{id}")
    public ResponseEntity<?> adminRespond(@Valid @RequestPart("request") ContactMessageRequest contactMessageRequest,
                                          @RequestPart(value = "file",required = false) MultipartFile file
    , @PathVariable("id") Long id, @AuthenticationPrincipal PrincipalUser principalUser){
        try {

          ContactMessageDto contactMessageDto =
                  contactService.sendRespondMessageAsAdmin(contactMessageRequest,file,principalUser.getUser(),id);
            return ResponseEntity.ok(contactMessageDto);
        }catch (InvalidFileException e){
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }
        catch (MessagingException e) {
            return ResponseEntity.internalServerError().body(new ApiResponse("Something went Wrong Try Again Later"));
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body(new ApiResponse("Something went Wrong Try Again Later"));
        }
    }

    @PostMapping("/user-respond/{id}")
    public ResponseEntity<?> userRespondToAdmin(@RequestPart("request") ContactMessageRequest request,
                                                @RequestPart(value = "file",required = false)MultipartFile file
    ,@PathVariable("id")Long id,@AuthenticationPrincipal PrincipalUser principalUser){

        try {
            ContactMessageDto contactMessageDto = contactService.sendRespondMessageAsUser(request,file,principalUser.getUser()
            ,id);
            return ResponseEntity.ok(contactMessageDto);
        }catch (InvalidFileException e){
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }catch (UserMessageNotAllowedException e){
            return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage()));
        }
        catch (IOException e) {
            return ResponseEntity.internalServerError().body(new ApiResponse("Something went Wrong Try Again Later"));
        }
    }

}
