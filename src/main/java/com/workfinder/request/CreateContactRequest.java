package com.workfinder.request;

import com.workfinder.enums.ContactCategory;
import lombok.Getter;

@Getter
public class CreateContactRequest {

    private String title;
    private String description;
    private ContactCategory contactCategory;

    public CreateContactRequest() {
    }
}
