package com.workfinder.request;

import lombok.Getter;

@Getter
public class UpdateEmployeeAccountRequest {

    private String firstName;
    private String lastName;
    private Integer phoneNumber;
    private String email;
    private String password;

}
