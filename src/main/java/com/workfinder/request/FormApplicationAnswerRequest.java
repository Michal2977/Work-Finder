package com.workfinder.request;

import lombok.Getter;

import java.util.List;

@Getter
public class FormApplicationAnswerRequest {

    Long applicationId;
    String sendCvName;
    List<String> answer;


    public FormApplicationAnswerRequest() {
    }
}
