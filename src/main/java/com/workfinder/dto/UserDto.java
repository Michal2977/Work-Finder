package com.workfinder.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class UserDto {

    private Long id;
    private String email;
    private String password;
    private String displayName;
    private EmployerDto employerDto;
    private EmployeeDto employeeDto;
    private Set<RoleDto> roleDto;
    private String picture;
    private boolean banned;
    private List<FavoriteJobDto> favoriteJobDto;


    public UserDto() {
    }

    public UserDto(Long id, String email, String password, String displayName, EmployerDto employerDto,
                   EmployeeDto employeeDto, Set<RoleDto> roleDto, String picture, boolean banned,
                   List<FavoriteJobDto> favoriteJobDto) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.employerDto = employerDto;
        this.employeeDto = employeeDto;
        this.roleDto = roleDto;
        this.picture = picture;
        this.banned = banned;
        this.favoriteJobDto = favoriteJobDto;
    }
}
