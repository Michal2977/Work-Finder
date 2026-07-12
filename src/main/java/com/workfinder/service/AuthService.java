package com.workfinder.service;

import com.workfinder.dto.UserDto;
import com.workfinder.entity.User;
import com.workfinder.request.EmployeeRegistrationRequest;
import com.workfinder.request.EmployerRegistrationRequest;

public interface AuthService {

    UserDto employerRegistration(EmployerRegistrationRequest request);
    UserDto employeeRegistration(EmployeeRegistrationRequest employeeRegistrationRequest);
    boolean passwordMatches(String password,User user);
    User findByEmail(String email);
    boolean emailExist(String email);
    UserDto findByEmailUserDto(String email);
}
