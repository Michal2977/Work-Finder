package com.workfinder.controller;

import com.workfinder.Util.Utility;
import com.workfinder.entity.User;
import com.workfinder.request.EmployeeRegistrationRequest;
import com.workfinder.request.EmployerRegistrationRequest;
import com.workfinder.request.LoginRequest;
import com.workfinder.response.ActionResponse;
import com.workfinder.response.ApiResponse;
import com.workfinder.response.JWTResponse;
import com.workfinder.security.JWTService;
import com.workfinder.service.impl.AuthServiceImpl;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
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


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
        User user = authService.findByEmail(loginRequest.getEmail());

        if (user == null ||  !authService.passwordMatches(loginRequest.getPassword(),user)){
            return ResponseEntity.badRequest().body(new ApiResponse("Incorrect Data"));
        }

        String token = jwtService.generateToken(user.getEmail());

        return ResponseEntity.ok(new JWTResponse(token));
    }


    @PostMapping("/employer-registration")
    public ResponseEntity<?> employerRegistration(@RequestBody EmployerRegistrationRequest request
    , HttpServletRequest requests){

        if (authService.emailExist(request.getEmail())){
            return ResponseEntity.badRequest().body(new ApiResponse("Email Already Exists"));
        }
        try {
            String siteUrl  = Utility.servletRequest(requests);
            authService.employerRegistration(request,siteUrl);
            return ResponseEntity.ok().body(new ActionResponse("Account Created","SUCCESS"));
        } catch (Exception e) {
           return ResponseEntity.internalServerError().body(new ApiResponse("Something Went Wrong Try Again Later"));
        }
    }

    @PostMapping("/employee-registration")
    public ResponseEntity<?> employeeRegistration(@RequestBody EmployeeRegistrationRequest request
    ,HttpServletRequest requests){

        if (authService.emailExist(request.getEmail())){
            return ResponseEntity.badRequest().body(new ApiResponse("Email Already Exists"));
        }
        try {
            String siteUrl = Utility.servletRequest(requests);
            authService.employeeRegistration(request,siteUrl);
            return ResponseEntity.ok().body(new ActionResponse("Account Created","SUCCESS"));
        } catch (Exception e) {
      return ResponseEntity.internalServerError().body
              (new ApiResponse("Something Went Wrong Try Again Later"));
        }

    }

    @GetMapping("/verify")
    public ResponseEntity<?> verifyAccount(@RequestParam("code")String code){
        boolean verify = authService.emailVerification(code);
        if (verify == false){
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:5173/verify-failed"))
                    .build();
        }else {
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("http://localhost:5173/login"))
                    .build();
        }
    }

    @GetMapping("/resend")
    public ResponseEntity<?> resendEmailActivation(@RequestParam("email")String email,
                                                   HttpServletRequest request){

        User user = authService.findByEmail(email);

        if (!authService.emailExist(email) || user.isEnabled()){
            return ResponseEntity.badRequest().body(new ApiResponse
                    ("If an account exists and has not been activated, a verification email has been sent."));
        }
        try {
            String siteUrl = Utility.servletRequest(request);
            authService.resendEmailVerification(email,siteUrl);
            return ResponseEntity.ok().body(new ApiResponse("Activation Email has been Send"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse
                    ("Something Went Wrong Try again Later"));
        }
    }

    @GetMapping("/forgot-password")
    public ResponseEntity<?> forgotPasswordForm(@RequestParam("email")String email
    ,HttpServletRequest request){
        if (!authService.emailExist(email)){
            return ResponseEntity.badRequest().body(new ApiResponse
                    ("If an account with this email exists, a password reset email has been sent"));
        }
        try {
            String siteUrl = Utility.servletRequest(request);
            authService.sendResetPasswordToken(email,siteUrl);
            return ResponseEntity.ok().body(new ApiResponse("Email Has Been Send"));

        } catch (Exception e) {
           return ResponseEntity.internalServerError().body(new ApiResponse("Something Went Wrong Try Again Later"));
        }
    }


    @GetMapping("/reset-password")
    public ResponseEntity<?> resetPasswordPage(@RequestParam("token")String token){
        User user = authService.findByResetPasswordToken(token);
        if (user == null || user.getExpiresAt().isBefore(LocalDateTime.now())){
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create
                    ("http://localhost:5173/verify-failed")).build();
        }else {
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create
                    ("http://localhost:5173/reset-password?token=" + token)).build();
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPasswordProcess(@RequestParam("token")String token,@RequestParam("password")String
            password){
        User user = authService.findByResetPasswordToken(token);
        if (user == null || user.getExpiresAt().isBefore(LocalDateTime.now())){
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create
                    ("http://localhost:5173/verify-failed")).build();
        }else if (password == null || password.isBlank()){
            return ResponseEntity.badRequest().body(new ApiResponse("Password Is Reqiured"));
        }else {
            authService.resetPassword(password,user);
            return ResponseEntity.ok().body(new ApiResponse("Password Changed Correctly"));
        }
    }
}
