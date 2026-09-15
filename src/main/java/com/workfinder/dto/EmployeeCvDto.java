package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeCvDto {


    private Long id;
    private String cvFile;


    public EmployeeCvDto() {
    }

    public EmployeeCvDto(Long id, String cvFile) {
        this.id = id;
        this.cvFile = cvFile;
    }
}
