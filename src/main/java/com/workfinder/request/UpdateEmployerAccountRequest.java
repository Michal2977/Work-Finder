package com.workfinder.request;

import lombok.Getter;

@Getter
public class UpdateEmployerAccountRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String companyName;
    private String nip;
    private String phoneNumber;
    private String picture;
}
