package com.workfinder.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserDto {

    private String email;
    private String password;
    private String displayName;
    private EmployerDto employerDto;
    private EmployeeDto employeeDto;
    private Set<RoleDto> roleDto;
    private String picture;


    public UserDto() {
    }

    public UserDto(String email, String password, String displayName, EmployerDto employerDto,
                   EmployeeDto employeeDto, Set<RoleDto> roleDto, String picture) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.employerDto = employerDto;
        this.employeeDto = employeeDto;
        this.roleDto = roleDto;
        this.picture = picture;
    }
}
