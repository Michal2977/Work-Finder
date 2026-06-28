package com.workfinder.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployerDto {


    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    private String companyName;
    private Integer nip;

    public EmployerDto() {
    }

    public EmployerDto(String firstName, String lastName, Integer phoneNumber, String companyName, Integer nip) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.companyName = companyName;
        this.nip = nip;
    }
}
