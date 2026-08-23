package com.workfinder.request;

import com.workfinder.enums.ContactStatus;
import lombok.Getter;

@Getter
public class ChangeContactStatusRequest {

    private ContactStatus contactStatus;


    public ChangeContactStatusRequest() {
    }
}
