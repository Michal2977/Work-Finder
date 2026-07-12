package com.workfinder.security;

import com.workfinder.entity.Role;
import com.workfinder.entity.User;
import com.workfinder.repository.RoleRepository;
import com.workfinder.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DataInitializer(RoleRepository roleRepository, UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {

        if (roleRepository.count() == 0){
            roleRepository.save(new Role("EMPLOYER"));
            roleRepository.save(new Role("EMPLOYEE"));
            roleRepository.save(new Role("ADMIN"));
        }

        if (userRepository.countByRole_Role("ADMIN") == 0){
            Role admin = roleRepository.findByRole("ADMIN");
            User user = new User();
            user.setEmail("mkoszalka0@gmail.com");
            user.setPassword(passwordEncoder.encode("raw"));
            user.setRole(Set.of(admin));

            userRepository.save(user);

        }

    }
}
