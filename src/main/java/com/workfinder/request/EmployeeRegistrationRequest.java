package com.workfinder.request;

import lombok.Getter;

@Getter
public class EmployeeRegistrationRequest {

    private String email;
    private String password;
    private String turnstileToken;


    public EmployeeRegistrationRequest() {
    }
}
