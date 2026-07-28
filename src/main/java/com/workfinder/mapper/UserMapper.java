package com.workfinder.mapper;

import com.workfinder.dto.RoleDto;
import com.workfinder.dto.UserDto;
import com.workfinder.entity.User;

import java.util.Base64;
import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {
    public static UserDto userDto(User user){
        Set<RoleDto> roleDto = user.getRole().stream().map(RoleMapper :: roleDto).collect(Collectors.toSet());

        String base64Picture = null;
        if (user.getPicture() != null){
            base64Picture = Base64.getEncoder().encodeToString(user.getPicture());
        }
        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setPassword(null);
        userDto.setDisplayName(user.getDisplayName());
        userDto.setPicture(base64Picture);
        userDto.setRoleDto(roleDto);



        if (user.getEmployee() != null){
            userDto.setEmployeeDto(EmployeeMapper.employeeDto(user.getEmployee()));
        }

        if (user.getEmployer() != null){
            userDto.setEmployerDto(EmployerMapper.employerDto(user.getEmployer()));
        }

        return userDto;
    }
}
