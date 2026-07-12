package com.workfinder.request;

import lombok.Getter;

@Getter
public class EmployeeRegistrationRequest {

    private String email;
    private String password;


    public EmployeeRegistrationRequest() {
    }
}
