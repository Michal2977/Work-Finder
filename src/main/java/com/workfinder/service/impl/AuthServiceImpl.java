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
import com.workfinder.service.AuthService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDto employerRegistration(EmployerRegistrationRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

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

        return UserMapper.userDto(user);
    }

    @Override
    public UserDto employeeRegistration(EmployeeRegistrationRequest request) {
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        Role role = roleRepository.findByRole("EMPLOYEE");
        user.createRole(role);

        Employee employee = new Employee();
        user.setEmployee(employee);
        employee.setUser(user);

        userRepository.save(user);
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
}
