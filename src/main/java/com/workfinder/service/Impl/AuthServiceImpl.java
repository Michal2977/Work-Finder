package com.workfinder.service.Impl;

import com.workfinder.dto.UserDto;
import com.workfinder.entity.*;
import com.workfinder.enums.OAuth2UserProvider;
import com.workfinder.mapper.UserMapper;
import com.workfinder.repository.EmployeeRepository;
import com.workfinder.repository.EmployerRepository;
import com.workfinder.repository.RoleRepository;
import com.workfinder.repository.UserRepository;
import com.workfinder.request.EmployeeRegistrationRequest;
import com.workfinder.request.EmployerRegistrationRequest;
import com.workfinder.security.TurnstileResponse;
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

    @Value("${turnstile.secret-key}")
    private String turnstileSecret;

    @Value("${turnstile.verify-url}")
    private String turnstileUrl;


    private final BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final EmployerRepository employerRepository;
    private final EmployeeRepository employeeRepository;
    private final EmailServiceImpl emailService;
    private final RestTemplate restTemplate;

    public AuthServiceImpl(BCryptPasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository, EmployerRepository employerRepository, EmployeeRepository employeeRepository, EmailServiceImpl emailService, RestTemplate restTemplate) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.employerRepository = employerRepository;
        this.employeeRepository = employeeRepository;
        this.emailService = emailService;
        this.restTemplate = restTemplate;
    }


    @Override
    public UserDto registerEmployee(EmployeeRegistrationRequest request,String siteUrl) throws MessagingException {

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = roleRepository.findByRole("EMPLOYEE");
        user.createRole(role);
        user.setEnabled(false);
        user.setCreateAt(LocalDateTime.now());
        user.setExpiresAt(LocalDateTime.now().plusHours(24));


        String verificationCode = RandomString.make(65);
        user.setVerificationCode(verificationCode);

        Employee employee = new Employee();
        employee.setUser(user);
        user.setEmployee(employee);

        user = userRepository.save(user);

        UserProvider userProvider = new UserProvider();
        userProvider.setProvider(OAuth2UserProvider.LOCAL);
        userProvider.setProviderId(user.getId().toString());
        userProvider.setUser(user);

        user.addProvider(userProvider);

        user = userRepository.save(user);

        emailService.sendVerificationEmailForEmployee(user,siteUrl);

        return UserMapper.userDto(user);
    }

    @Override
    public UserDto registerEmployer(EmployerRegistrationRequest request,String siteUrl) throws MessagingException {
        User user = new User();

        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = roleRepository.findByRole("EMPLOYER");
        user.createRole(role);
        user.setCreateAt(LocalDateTime.now());
        user.setExpiresAt(LocalDateTime.now().plusHours(24));

        user.setEnabled(false);

        String verificationCode = RandomString.make(65);
        user.setVerificationCode(verificationCode);

        user = userRepository.save(user);

        Employer employer = new Employer();
        employer.setFirstName(request.getFirstName());
        employer.setLastName(request.getLastName());
        employer.setPhoneNumber(request.getPhoneNumber());
        employer.setNip(request.getNip());
        employer.setUser(user);
        user.setEmployer(employer);

        UserProvider userProvider = new UserProvider();
        userProvider.setProvider(OAuth2UserProvider.LOCAL);
        userProvider.setProviderId(user.getId().toString());
        user.addProvider(userProvider);

        emailService.sendVerificationEmailForEmployer(user,siteUrl);

        return UserMapper.userDto(user);
    }

    @Override
    public boolean emailExists(String email) {
      return  userRepository.existsByEmail(email);

    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean validatePassword( String password,User user) {
       return passwordEncoder.matches(password,user.getPassword());
    }

    @Override
    public UserDto findByEmailUserDto(String email){
        User user = userRepository.findByEmail(email);
        return UserMapper.userDto(user);
    }

    @Override
    public boolean verificationEmail(String code){
        User user = userRepository.findByVerificationCode(code);
        if (user == null || user.getExpiresAt().isBefore(LocalDateTime.now())){
            return false;
        }else {
            user.setVerificationCode(null);
            user.setExpiresAt(null);
            userRepository.save(user);
            userRepository.isEnabled(user.getId());
            return true;
        }
    }

    @Override
    public boolean resendEmailVerification(String email,String siteUrl) throws MessagingException {
        User user = userRepository.findByEmail(email);
        if (user == null || user.isEnabled() ){
            return false;
        }else {
            String verificationCode = RandomString.make(65);
            user.setVerificationCode(verificationCode);
            user.setExpiresAt(LocalDateTime.now().plusHours(24));
            userRepository.save(user);
            emailService.resendVerificationEmail(user,siteUrl);

            return true;
        }
    }

    @Override
    public boolean forgotPasswordEmail(String email,String siteUrl) throws MessagingException {
        User user = userRepository.findByEmail(email);
        if (user == null){
            return false;
        }else {
            String generateToken = RandomString.make(45);
            user.setResetPasswordToken(generateToken);
            user.setExpiresAt(LocalDateTime.now().plusHours(24));
            userRepository.save(user);
            emailService.sendResetPasswordEmail(user,siteUrl);
            return true;
        }
    }
    @Override
    public User findByResetPasswordToken(String token){
        return userRepository.findByResetPasswordToken(token);
    }
    @Override
    public void resetPassword(User user,String newPassword){
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetPasswordToken(null);
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

        HttpEntity<MultiValueMap<String ,String>> request = new HttpEntity<>(map,headers);

        TurnstileResponse response = restTemplate.postForObject(turnstileUrl,request, TurnstileResponse.class);

        System.out.println("success: " + response.isSuccess());
        System.out.println("hostName: " + response.getHostname());
        System.out.println("challenge timeStamp: " + response.getChallenge_ts());

        if (response.getErrorCodes() != null){
            for (String error : response.getErrorCodes()){
                System.out.println(error);
            }
        }
        return response.isSuccess();
    }


}
