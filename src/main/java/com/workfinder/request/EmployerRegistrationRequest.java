package com.workfinder.request;

import lombok.Getter;

@Getter
public class EmployerRegistrationRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private Integer phoneNumber;
    private Integer nip;

    public EmployerRegistrationRequest() {
    }
}
