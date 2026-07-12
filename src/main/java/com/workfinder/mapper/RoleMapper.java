package com.workfinder.mapper;

import com.workfinder.dto.RoleDto;
import com.workfinder.entity.Role;

public class RoleMapper {
    public static RoleDto roleDto(Role role){
        return new RoleDto(role.getRole());
    }
}
