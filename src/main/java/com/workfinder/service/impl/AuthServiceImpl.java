package com.workfinder.service.impl;

import com.workfinder.dto.UserDto;
import com.workfinder.entity.*;
import com.workfinder.enums.OAuth2UserProvider;
import com.workfinder.exception.EmailUpdateException;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.exception.PasswordChangeNotAllowedException;
import com.workfinder.mapper.UserMapper;
import com.workfinder.repository.RoleRepository;
import com.workfinder.repository.UserRepository;
import com.workfinder.request.EmployeeRegistrationRequest;
import com.workfinder.request.EmployerRegistrationRequest;
import com.workfinder.request.UpdateEmployeeAccountRequest;
import com.workfinder.request.UpdateEmployerAccountRequest;
import com.workfinder.response.TurnstileResponse;
import com.workfinder.service.AuthService;
import jakarta.mail.MessagingException;
import jakarta.mail.Multipart;
import jakarta.transaction.Transactional;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Objects;

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

        user = userRepository.save(user);

        UserProvider userProvider = new UserProvider();
        userProvider.setProvider(OAuth2UserProvider.LOCAL);
        userProvider.setProviderId(user.getId().toString());
        userProvider.setUser(user);

        user.addProvider(userProvider);

        user = userRepository.save(user);

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

       user = userRepository.save(user);

        UserProvider userProvider = new UserProvider();
        userProvider.setProvider(OAuth2UserProvider.LOCAL);
        userProvider.setProviderId(user.getId().toString());
        userProvider.setUser(user);

        user.addProvider(userProvider);

        user = userRepository.save(user);

        emailService.employeeAccountVerification(user,siteUrl);
        return UserMapper.userDto(user);
    }
    @Transactional
    public void linkLocalAccount(User user,String password){
        user.setPassword(passwordEncoder.encode(password));
        UserProvider userProvider = new UserProvider();
        userProvider.setProvider(OAuth2UserProvider.LOCAL);
        userProvider.setProviderId(user.getId().toString());
        userProvider.setUser(user);

        user.addProvider(userProvider);
    }

    @Transactional
    @Override
    public  void  linkLocalEmployer(User user,EmployerRegistrationRequest request){

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        Role role = roleRepository.findByRole("EMPLOYER");
        user.getRole().clear();
        user.createRole(role);

        Employer employer = new Employer();
        employer.setFirstName(request.getFirstName());
        employer.setLastName(request.getLastName());
        employer.setNip(request.getNip());
        employer.setPhoneNumber(request.getPhoneNumber());
        employer.setUser(user);
        user.setEmployer(employer);

        user = userRepository.save(user);

        UserProvider userProvider = new UserProvider();
        userProvider.setProvider(OAuth2UserProvider.LOCAL);
        userProvider.setProviderId(user.getId().toString());
        userProvider.setUser(user);

        user.addProvider(userProvider);

        userRepository.save(user);
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

    @Override
    public User findByEmailWithProviders(String email) {
        return userRepository.findByEmailWithProviders(email).orElse(null);
    }


    @Override
    public UserDto updateEmployeeAccountData(User user, UpdateEmployeeAccountRequest request
    , String siteUrl, MultipartFile file) throws MessagingException, IOException {

        boolean hasLocal = user.getProviders().stream().anyMatch(p -> p.getProvider()
                == OAuth2UserProvider.LOCAL);

        if (file != null && !file.isEmpty()){
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            if (fileName.contains("..")){
                throw new InvalidFileException("Invalid file name");
            }
            String contentType = file.getContentType();
            if (contentType == null || !(contentType.equals("image/png")|| contentType.equals("image/jpeg")
            || contentType.equals("image/webp"))){
                throw new InvalidFileException("Only image files are allowed");
            }
            if (file.getSize() > 10 * 1024 *1024){
                throw new InvalidFileException("Maximum file size is 10 MB.");
            }
            user.getEmployee().setPicture(file.getBytes());
        }
        if (request.getPassword() != null && !request.getPassword().isBlank() && !hasLocal){
            throw new PasswordChangeNotAllowedException("Password changes are not available for this sign-in method.");
        }
        if (request.getEmail() != null && !request.getEmail().isBlank() && !user.getEmail().equals(request.getEmail())){

            String verificationCode = RandomString.make(65);
            user.setVerificationCode(verificationCode);
            user.setExpiresAt(LocalDateTime.now().plusHours(24));
            user.setTemporaryEmail(request.getEmail());

            userRepository.save(user);
            emailService.changeEmail(user,siteUrl);
            throw new EmailUpdateException("We've sent a verification email to your email address");
        }
        if (request.getPassword() != null && !request.getPassword().isBlank() && hasLocal ){
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        user.getEmployee().setPhoneNumber(request.getPhoneNumber());
        user.getEmployee().setFirstName(request.getFirstName());
        user.getEmployee().setLastName(request.getLastName());

        userRepository.save(user);
        return UserMapper.userDto(user);
    }

    @Override
    public UserDto updateEmployerAccountData(User user , UpdateEmployerAccountRequest request
            ,String siteUrl,MultipartFile file) throws MessagingException, IOException {

        boolean hasLocal = user.getProviders().stream().anyMatch(p -> p.getProvider() ==
                OAuth2UserProvider.LOCAL);

        if (file != null && !file.isEmpty()){
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            if (fileName.contains("..")){
                throw new InvalidFileException("Invalid file name");
            }
            String contentType = file.getContentType();
            if ( contentType == null || !(contentType.equals("image/png") ||
                    contentType.equals("image/jpeg")
            || contentType.equals("image/webp"))){
                throw new InvalidFileException("Only image files are allowed");
            }
            if (file.getSize() >  10 * 1024 * 1024){
                throw new InvalidFileException("Maximum file size is 10 MB.");
            }
            user.getEmployer().setPicture(file.getBytes());
        }

        if (request.getPassword() != null && !request.getPassword().isBlank() && !hasLocal){
            throw new PasswordChangeNotAllowedException("Password changes are not available for this sign-in method.");
        }
        if (request.getEmail() != null && !request.getEmail().isBlank() && !user.getEmail().equals(request.getEmail())){
            String verifyCode = RandomString.make(65);
            user.setVerificationCode(verifyCode);
            user.setExpiresAt(LocalDateTime.now().plusHours(24));
            user.setTemporaryEmail(request.getEmail());

            userRepository.save(user);

            emailService.changeEmail(user,siteUrl);
            throw new EmailUpdateException("We've sent a verification email to your email address");
        }
        if (request.getPassword() != null && !request.getPassword().isBlank() && hasLocal){
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        user.getEmployer().setFirstName(request.getFirstName());
        user.getEmployer().setLastName(request.getLastName());
        user.getEmployer().setCompanyName(request.getCompanyName());
        user.getEmployer().setNip(request.getPhoneNumber());
        user.getEmployer().setPhoneNumber(request.getPhoneNumber());

        userRepository.save(user);
        return UserMapper.userDto(user);
    }

    @Override
    public boolean emailUpdate(String code){
        User user = userRepository.findByVerificationCode(code);
        if (user == null || user.getExpiresAt().isBefore(LocalDateTime.now())){
            return false;
        }else {
            user.setExpiresAt(null);
            user.setVerificationCode(null);
            user.setEmail(user.getTemporaryEmail());
            user.setTemporaryEmail(null);
            userRepository.save(user);
            return true;
        }
    }






}
