package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDto {

    private String firstName;
    private String lastName;
    private Integer phoneNumber;


    public EmployeeDto() {
    }

    public EmployeeDto(String firstName, String lastName, Integer phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
}
