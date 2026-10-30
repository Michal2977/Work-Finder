package com.workfinder.mapper;

import com.workfinder.dto.EmployeeCvDto;
import com.workfinder.dto.EmployeeDto;
import com.workfinder.entity.Employee;

import java.util.Base64;
import java.util.List;

public class EmployeeMapper {
    public static EmployeeDto employeeDto(Employee employee){


            List<EmployeeCvDto> employeeCvs = employee.getEmployeeCv().stream().map(
          cv -> new EmployeeCvDto(cv.getId(),Base64.getEncoder().encodeToString(cv.getCvFile())
          ,cv.getCvFileName())).toList();

        return new EmployeeDto(employee.getFirstName(),employee.getLastName(),employee.getPhoneNumber(),employeeCvs);
    }
}

