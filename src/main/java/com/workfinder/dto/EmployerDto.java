package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployerDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String companyName;
    private String nip;
    private String phoneNumber;

    public EmployerDto() {
    }

    public EmployerDto(Long id, String firstName, String lastName, String companyName, String nip, String phoneNumber) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.nip = nip;
        this.phoneNumber = phoneNumber;

    }
}
