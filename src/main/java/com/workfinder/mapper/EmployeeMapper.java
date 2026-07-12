package com.workfinder.mapper;

import com.workfinder.dto.EmployeeDto;
import com.workfinder.entity.Employee;

public class EmployeeMapper {
    public static EmployeeDto employeeDto(Employee employee){
        return new EmployeeDto(employee.getFirstName(),employee.getLastName(),employee.getPhoneNumber());
    }
}
