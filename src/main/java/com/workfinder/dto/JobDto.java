package com.workfinder.dto;

import com.workfinder.enums.*;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class JobDto {

    private Long id;
    private String title;
    private String description;
    private Double salary;
    private String location;
    private Set<ContractType> contractType;
    private String workSchedule;
    private EmploymentType employmentType;
    private JobStart jobStart;
    private Set<WorkMode> workMode;
    private String duties;
    private String requirements;
    private String weOffer;
    private JobCategory jobCategory;
    private SalaryPeriod salaryPeriod;
    private SalaryType salaryType;
    private String picture;
    private EmployerDto employerDto;

    public JobDto() {
    }

    public JobDto(Long id, String title, String description, Double salary, String location, Set<ContractType>
            contractType, String workSchedule, EmploymentType employmentType, JobStart jobStart,
                  Set<WorkMode> workMode, String duties, String requirements, String weOffer,
                  JobCategory jobCategory, SalaryPeriod salaryPeriod, SalaryType salaryType, String picture,
                  EmployerDto employerDto) {
        this.id = id;
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
        this.salaryPeriod = salaryPeriod;
        this.salaryType = salaryType;
        this.picture = picture;
        this.employerDto = employerDto;
    }
}
