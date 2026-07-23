package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeDto {

    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    private String picture;


    public EmployeeDto() {
    }

    public EmployeeDto(String firstName, String lastName, Integer phoneNumber, String picture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.picture = picture;
    }
}
