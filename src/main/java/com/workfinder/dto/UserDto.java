package com.workfinder.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserDto {

    private String email;
    private String password;
    private EmployerDto employerDto;
    private EmployeeDto employeeDto;
    private Set<RoleDto> roleDto;


    public UserDto() {
    }

    public UserDto(String email, String password, EmployerDto employerDto, EmployeeDto employeeDto, Set<RoleDto> roleDto) {
        this.email = email;
        this.password = password;
        this.employerDto = employerDto;
        this.employeeDto = employeeDto;
        this.roleDto = roleDto;
    }
}
