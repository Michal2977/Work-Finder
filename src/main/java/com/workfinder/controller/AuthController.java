package com.workfinder.controller;

import com.workfinder.entity.User;
import com.workfinder.request.EmployeeRegistrationRequest;
import com.workfinder.request.EmployerRegistrationRequest;
import com.workfinder.request.LoginRequest;
import com.workfinder.response.ApiResponse;
import com.workfinder.response.JWTResponse;
import com.workfinder.security.JWTService;
import com.workfinder.service.impl.AuthServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<?> employerRegistration(@RequestBody EmployerRegistrationRequest request){

        if (authService.emailExist(request.getEmail())){
            return ResponseEntity.badRequest().body(new ApiResponse("Email Already Exists"));
        }
        authService.employerRegistration(request);
        return ResponseEntity.ok().body(new ApiResponse("Account Created"));
    }

    @PostMapping("/employee-registration")
    public ResponseEntity<?> employeeRegistration(@RequestBody EmployeeRegistrationRequest request){

        if (authService.emailExist(request.getEmail())){
            return ResponseEntity.badRequest().body(new ApiResponse("Email Already Exists"));
        }

        authService.employeeRegistration(request);
        return ResponseEntity.ok().body(new ApiResponse("Account Created"));
    }
}
