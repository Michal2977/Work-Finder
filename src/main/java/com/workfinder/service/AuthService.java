package com.workfinder.service;

import com.workfinder.dto.UserDto;
import com.workfinder.entity.User;
import com.workfinder.request.EmployeeRegistrationRequest;
import com.workfinder.request.EmployerRegistrationRequest;
import jakarta.mail.MessagingException;

public interface AuthService {

    UserDto registerEmployee(EmployeeRegistrationRequest  request,String siteUrl) throws MessagingException;
    UserDto registerEmployer(EmployerRegistrationRequest request,String siteUrl) throws MessagingException ;
    boolean resendEmailVerification(String email,String siteUrl) throws MessagingException;
    boolean emailExists(String email);
    User findByEmail(String email);
    boolean validatePassword( String password,User user);
    UserDto findByEmailUserDto(String email);
    boolean verificationEmail(String code);
    boolean forgotPasswordEmail(String email,String siteUrl) throws MessagingException;
    User findByResetPasswordToken(String token);
    void resetPassword(User user,String newPassword);
    boolean verifyTurnstile(String token);
}
