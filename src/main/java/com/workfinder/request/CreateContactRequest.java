package com.workfinder.request;

import lombok.Getter;

@Getter
public class CreateContactRequest {

    private String title;
    private String description;

    public CreateContactRequest() {
    }
}
