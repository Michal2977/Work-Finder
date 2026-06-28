package com.workfinder.request;

import lombok.Getter;

@Getter
public class LoginRequest {

    private String email;
    private String password;

    public LoginRequest() {
    }
}
