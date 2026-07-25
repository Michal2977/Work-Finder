package com.workfinder.dto;

import com.workfinder.enums.*;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobDto {

    private String title;
    private String description;
    private Double salary;
    private String location;
    private ContractType contractType;
    private String workSchedule;
    private EmploymentType employmentType;
    private JobStart jobStart;
    private WorkMode workMode;
    private String duties;
    private String requirements;
    private String weOffer;
    private JobCategory jobCategory;
    private EmployerDto employerDto;

    public JobDto() {
    }

    public JobDto(String title, String description, Double salary, String location, ContractType contractType,
                  String workSchedule, EmploymentType employmentType, JobStart jobStart,
                  WorkMode workMode, String duties, String requirements, String weOffer, JobCategory jobCategory, EmployerDto employerDto) {
        this.title = title;
        this.description = description;
        this.salary = salary;
        this.location = location;
        this.contractType = contractType;
        this.workSchedule = workSchedule;
        this.employmentType = employmentType;
        this.jobStart = jobStart;
        this.workMode = workMode;
        this.duties = duties;
        this.requirements = requirements;
        this.weOffer = weOffer;
        this.jobCategory = jobCategory;
        this.employerDto = employerDto;
    }
}
