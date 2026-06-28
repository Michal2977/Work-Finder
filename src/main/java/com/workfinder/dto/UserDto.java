package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserDto {

    private String email;
    private String password;
    private Set<RoleDto> roleDto;
    private EmployeeDto employeeDto;
    private EmployerDto employerDto;

    public UserDto() {
    }

    public UserDto(String email, String password, Set<RoleDto> roleDto, EmployeeDto employeeDto, EmployerDto employerDto) {
        this.email = email;
        this.password = password;
        this.roleDto = roleDto;
        this.employeeDto = employeeDto;
        this.employerDto = employerDto;
    }
}
