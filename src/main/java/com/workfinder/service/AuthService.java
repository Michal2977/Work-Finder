package com.workfinder.service;

import com.workfinder.dto.UserDto;
import com.workfinder.entity.User;
import com.workfinder.request.EmployeeRegistrationRequest;
import com.workfinder.request.EmployerRegistrationRequest;
import com.workfinder.request.UpdateEmployeeAccountRequest;
import com.workfinder.request.UpdateEmployerAccountRequest;
import jakarta.mail.MessagingException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface AuthService {

    UserDto employerRegistration(EmployerRegistrationRequest request,String siteUrl) throws MessagingException;
    UserDto employeeRegistration(EmployeeRegistrationRequest employeeRegistrationRequest,String siteUrl) throws MessagingException;
    boolean passwordMatches(String password,User user);
    User findByEmail(String email);
    boolean emailExist(String email);
    UserDto findByEmailUserDto(String email);
    boolean emailVerification(String code);
    boolean resendEmailVerification(String email,String siteUrl) throws MessagingException;
    boolean sendResetPasswordToken(String email,String siteUrl) throws MessagingException;
    void resetPassword(String password, User user);
    User findByResetPasswordToken(String token);
    boolean verifyTurnstile(String token);

    User findByEmailWithProviders(String email);
    void  linkLocalEmployer(User user,EmployerRegistrationRequest request);
    UserDto updateEmployeeAccountData(User user, UpdateEmployeeAccountRequest request, String siteUrl, MultipartFile file)
            throws MessagingException, IOException;
    UserDto updateEmployerAccountData(User user , UpdateEmployerAccountRequest request,String siteUr,MultipartFile file)
            throws MessagingException,IOException;
    boolean emailUpdate(String code);
}
