package com.workfinder.dto;


import com.workfinder.enums.ApplicationField;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class ApplicationDto {

    private Long id;
    private List<String> question;
    private Set<ApplicationField> applicationField;



    public ApplicationDto() {
    }

    public ApplicationDto(Long id, List<String> question, Set<ApplicationField> applicationField) {
        this.id = id;
        this.question = question;
        this.applicationField = applicationField;
    }
}
