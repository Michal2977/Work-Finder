package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDto {

    private String firstName;
    private String lastName;
    private String phoneNumber;


    public EmployeeDto() {
    }

    public EmployeeDto(String firstName, String lastName, String phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
}
