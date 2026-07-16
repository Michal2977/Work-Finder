package com.workfinder.service.impl;

import com.workfinder.dto.UserDto;
import com.workfinder.entity.Employee;
import com.workfinder.entity.Employer;
import com.workfinder.entity.Role;
import com.workfinder.entity.User;
import com.workfinder.mapper.UserMapper;
import com.workfinder.repository.RoleRepository;
import com.workfinder.repository.UserRepository;
import com.workfinder.request.EmployeeRegistrationRequest;
import com.workfinder.request.EmployerRegistrationRequest;
import com.workfinder.response.TurnstileResponse;
import com.workfinder.service.AuthService;
import jakarta.mail.MessagingException;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {


    @Value("${turnstile.verify-url}")
    private String turnstileUrl;

    @Value("${turnstile.secret-key}")
    private String turnstileSecret;

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final EmailServiceImpl emailService;
    private final RestTemplate restTemplate;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder, EmailServiceImpl emailService, RestTemplate restTemplate) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
        this.restTemplate = restTemplate;
    }

    @Override
    public UserDto employerRegistration(EmployerRegistrationRequest request,String siteUrl) throws MessagingException {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(false);
        user.setCreateAt(LocalDateTime.now());
        user.setExpiresAt(LocalDateTime.now().plusHours(24));

        String verificationCode = RandomString.make(65);
        user.setVerificationCode(verificationCode);

        Role role = roleRepository.findByRole("EMPLOYER");
        user.createRole(role);

        Employer employer = new Employer();
        employer.setFirstName(request.getFirstName());
        employer.setLastName(request.getLastName());
        employer.setNip(request.getNip());
        employer.setPhoneNumber(request.getPhoneNumber());
        employer.setUser(user);
        user.setEmployer(employer);

        userRepository.save(user);

        emailService.employerAccountVerification(user,siteUrl);


        return UserMapper.userDto(user);
    }

    @Override
    public UserDto employeeRegistration(EmployeeRegistrationRequest request,String siteUrl) throws MessagingException {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setEnabled(false);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setCreateAt(LocalDateTime.now());
        user.setExpiresAt(LocalDateTime.now().plusHours(24));

        String verificationCode = RandomString.make(65);
        user.setVerificationCode(verificationCode);

        Role role = roleRepository.findByRole("EMPLOYEE");
        user.createRole(role);

        Employee employee = new Employee();
        user.setEmployee(employee);
        employee.setUser(user);

        userRepository.save(user);

        emailService.employeeAccountVerification(user,siteUrl);
        return UserMapper.userDto(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean passwordMatches(String password,User user){
       return passwordEncoder.matches(password,user.getPassword());
    }
    @Override
    public boolean emailExist(String email){
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserDto findByEmailUserDto(String email) {
        User user = userRepository.findByEmail(email);
        return UserMapper.userDto(user);
    }

    @Override
    public boolean emailVerification(String code){
       User user = userRepository.findByVerificationCode(code);
       if (user == null || user.getExpiresAt().isBefore(LocalDateTime.now())){
           return false;
       }else {
           user.setExpiresAt(null);
           user.setVerificationCode(null);
           userRepository.save(user);
           userRepository.isEnabled(user.getId());
           return true;
       }
    }

    @Override
    public  boolean resendEmailVerification(String email,String siteUrl) throws MessagingException {
        User user = userRepository.findByEmail(email);
        if (user == null || user.isEnabled()){
            return false;
        }else {
            String verifyCode = RandomString.make(65);
            user.setVerificationCode(verifyCode);
            user.setExpiresAt(LocalDateTime.now().plusHours(24));
            userRepository.save(user);
            emailService.resendVerificationEmail(user,siteUrl);
            return true;
        }
    }
    @Override
    public boolean sendResetPasswordToken(String email,String siteUrl) throws MessagingException {
        User user = userRepository.findByEmail(email);
        if (user == null){
            return false;
        }else {
            String token = RandomString.make(45);
            user.setVerificationToken(token);
            user.setExpiresAt(LocalDateTime.now().plusHours(24));
            userRepository.save(user);
            emailService.forgotPasswordEmail(user,siteUrl);
            return true;
        }
    }

    @Override
    public User findByResetPasswordToken(String token) {
        return userRepository.findByVerificationToken(token);
    }

    @Override
    public void resetPassword(String password, User user) {
        user.setPassword(passwordEncoder.encode(password));
        user.setVerificationToken(null);
        user.setExpiresAt(null);
        userRepository.save(user);
    }

    @Override
    public boolean verifyTurnstile(String token){
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String,String> map = new LinkedMultiValueMap<>();

        map.add("secret",turnstileSecret);
        map.add("response",token);
        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(map,headers);
        TurnstileResponse response = restTemplate.postForObject(turnstileUrl,request,TurnstileResponse.class);

        System.out.println("success: " + response.isSuccess());
        System.out.println("hostName: " + response.getHostName());
        System.out.println("challenge timeStamp: " + response.getChallenge_ts());

        if (response.getError_codes() != null){
            for (String error : response.getError_codes()){
                System.out.println(error);
            }
        }

        return  response.isSuccess();
    }



}
