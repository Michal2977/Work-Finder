package com.workfinder.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployerRegistrationRequest {

    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    private Integer nip;
    private String email;
    private String password;

    public EmployerRegistrationRequest() {
    }


}
