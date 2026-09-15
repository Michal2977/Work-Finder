package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EmployeeDto {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private List<EmployeeCvDto> employeeCvDto;

    public EmployeeDto() {
    }

    public EmployeeDto(String firstName, String lastName, String phoneNumber, List<EmployeeCvDto> employeeCvDto) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.employeeCvDto = employeeCvDto;
    }
}
