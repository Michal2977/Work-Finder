package com.workfinder.mapper;

import com.workfinder.dto.RoleDto;
import com.workfinder.dto.UserDto;
import com.workfinder.entity.User;

import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {
    public static UserDto userDto(User user){
        Set<RoleDto> roleDto = user.getRole().stream().map(RoleMapper :: roleDto).collect(Collectors.toSet());

        UserDto userDto = new UserDto();
        userDto.setEmail(user.getEmail());
        userDto.setPassword(null);
        userDto.setRoleDto(roleDto);

        if (user.getEmployee() != null ){
            userDto.setEmployeeDto(EmployeeMapper.employeeDto(user.getEmployee()));
        }
        if (user.getEmployer() != null){
            userDto.setEmployerDto(EmployerMapper.employerDto(user.getEmployer()));
        }
        return userDto;
    }
}
