package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployerDto {

    private String firstName;
    private String lastName;
    private String companyName;
    private Integer nip;
    private Integer phoneNumber;

    public EmployerDto() {
    }

    public EmployerDto(String firstName, String lastName, String companyName, Integer nip, Integer phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.nip = nip;
        this.phoneNumber = phoneNumber;
    }
}
