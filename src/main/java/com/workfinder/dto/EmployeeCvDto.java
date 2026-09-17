package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeCvDto {


    private Long id;
    private String cvFile;
    private String cvFileName;


    public EmployeeCvDto() {
    }

    public EmployeeCvDto(Long id, String cvFile, String cvFileName) {
        this.id = id;
        this.cvFile = cvFile;
        this.cvFileName = cvFileName;
    }
}
