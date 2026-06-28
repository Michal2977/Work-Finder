package com.workfinder.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRegistrationRequest {

    private String email;
    private String password;

    public EmployeeRegistrationRequest() {
    }


}
