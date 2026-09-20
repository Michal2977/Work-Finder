package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationDto {

    private Long id;
    private String question;
    private JobDto jobDto;


    public ApplicationDto() {
    }

    public ApplicationDto(Long id, String question, JobDto jobDto) {
        this.id = id;
        this.question = question;
        this.jobDto = jobDto;
    }
}
