package com.workfinder.request;

import lombok.Getter;

@Getter
public class UpdateEmployeeAccountRequest {

    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String password;
    private String picture;


}
