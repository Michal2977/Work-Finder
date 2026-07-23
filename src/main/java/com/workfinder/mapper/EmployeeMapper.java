package com.workfinder.mapper;

import com.workfinder.dto.EmployeeDto;
import com.workfinder.entity.Employee;

import java.util.Base64;

public class EmployeeMapper {
    public static EmployeeDto employeeDto(Employee employee){
        String base64Picture = null;
        if (employee.getPicture() != null){
            base64Picture = Base64.getEncoder().encodeToString(employee.getPicture());
        }
        return new EmployeeDto(employee.getFirstName(),employee.getLastName(),employee.getPhoneNumber(),base64Picture);
    }
}

