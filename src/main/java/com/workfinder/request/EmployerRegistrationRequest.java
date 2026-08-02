package com.workfinder.request;

import lombok.Getter;

@Getter
public class EmployerRegistrationRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String nip;
    private String turnstileToken;

    public EmployerRegistrationRequest() {
    }
}
