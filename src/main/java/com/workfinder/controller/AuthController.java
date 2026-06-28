package com.workfinder.controller;

import com.workfinder.Util.Utility;
import com.workfinder.entity.User;
import com.workfinder.request.EmployeeRegistrationRequest;
import com.workfinder.request.EmployerRegistrationRequest;
import com.workfinder.request.LoginRequest;
import com.workfinder.response.ApiResponse;
import com.workfinder.response.JWTResponse;
import com.workfinder.security.JWTService;
import com.workfinder.service.Impl.AuthServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthServiceImpl authService;
    private final JWTService jwtService;

    public AuthController(AuthServiceImpl authService, JWTService jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }

    @PostMapping("/employeeRegistration")
    public ResponseEntity<?> employeeRegistration(@RequestBody EmployeeRegistrationRequest request,
                                                  HttpServletRequest requests){

        String turnstileResponse = requests.getParameter("cf-turnstile-response");
        if (!authService.verifyTurnstile(turnstileResponse)){
            return ResponseEntity.badRequest().body(new ApiResponse("Turnstile verification failed"));
        }

        if (authService.emailExists(request.getEmail())){
         return ResponseEntity.badRequest().body(new ApiResponse("Email Already Exists"));
        }
        try {
            String siteUrl = Utility.servetRequest(requests);
            authService.registerEmployee(request,siteUrl);
            return ResponseEntity.ok().body(new ApiResponse("Registration Success"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse("Something Went Wrong Try Again Later"));
        }


    }

    @PostMapping("/employerRegistration")
    public ResponseEntity<?> employerRegistration(@RequestBody EmployerRegistrationRequest request,
                                                  HttpServletRequest requests){
        String turnstileResponse = requests.getParameter("cf-turnstile-response");
        if (!authService.verifyTurnstile(turnstileResponse)){
            return ResponseEntity.badRequest().body(new ApiResponse("Turnstile verification failed"));
        }

        if (authService.emailExists(request.getEmail())){
            return ResponseEntity.badRequest().body(new ApiResponse("Email Already Exists"));
        }try {
            String siteUrl = Utility.servetRequest(requests);
            authService.registerEmployer(request,siteUrl);
            return ResponseEntity.ok().body(new ApiResponse("Registration Success"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse("Something Went Wrong Try Again Later"));
        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> loginProcess(@RequestBody LoginRequest loginRequest){
        User user = authService.findByEmail(loginRequest.getEmail());

        if ( user == null || !authService.validatePassword(loginRequest.getPassword(),user)){
          return   ResponseEntity.badRequest().body(new ApiResponse("Incorrect Data"));
        }
        String token = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(new JWTResponse(token));
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyAccount(@RequestParam("code")String code){
       boolean verify = authService.verificationEmail(code);
       if (verify == false){
           return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:5173/Verify-Failed"))
                   .build();
       }else {
           return ResponseEntity.status(HttpStatus.FOUND).location(URI.create
                   ("http://localhost:5173/Login")).build();
       }
    }

    @GetMapping("/resend")
    public ResponseEntity<?> resendActivationEmail(@RequestParam("email")String email,HttpServletRequest request){
       if (!authService.emailExists(email)){
           return ResponseEntity.badRequest().body(new ApiResponse("Could not find Any User With this Email"));
       }
       try {
           String siteUrl = Utility.servetRequest(request);
           boolean resend = authService.resendEmailVerification(email,siteUrl);
           if (!resend){
               return ResponseEntity.badRequest().body(new ApiResponse("Account already activated"));
           }
           return ResponseEntity.ok().body(new ApiResponse("check your email to confirm your account"));
       }catch (Exception e){
         return ResponseEntity.badRequest().body(new ApiResponse("something went wrong try again later"));
       }
    }

   @GetMapping("/forgot-password")
    public ResponseEntity<?> forgotPasswordEmail(@RequestParam("email")String email,HttpServletRequest request){
        if (!authService.emailExists(email)){
            return ResponseEntity.badRequest().body(new ApiResponse("Could not find Any User With this Email"));
        }
        try {
            String siteUrl = Utility.servetRequest(request);
            authService.forgotPasswordEmail(email,siteUrl);
            return ResponseEntity.ok().body(new ApiResponse("check your email to reset your password"));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(new ApiResponse("Something Went Wrong Try Again later"));

        }
   }

   @GetMapping("/reset-password")
    public ResponseEntity<?> resetPasswordPage(@RequestParam("token")String token){
        User user = authService.findByResetPasswordToken(token);
        if (user == null || user.getExpiresAt().isBefore(LocalDateTime.now())){
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:5173/Verify-Failed"))
                    .build();
        }else {
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:5173/ResetPassword?token=" + token))
                    .build();
        }
   }

   @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token")String token,
                                           @RequestParam("password")String newPassword){
        User user = authService.findByResetPasswordToken(token);
        if (user == null || user.getExpiresAt().isBefore(LocalDateTime.now())){
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:5173/Verify-Failed"))
                    .build();
        }else {
            authService.resetPassword(user,newPassword);
            return ResponseEntity.ok().body(new ApiResponse("Password Changed Correctly"));
        }

   }


}
