package com.workfinder.request;

import com.workfinder.dto.EmployerDto;
import com.workfinder.enums.*;
import lombok.Getter;

import java.util.Set;

@Getter
public class CreateJobOfferRequest {

    private String title;
    private String description;
    private Double salary;
    private String location;
    private String workSchedule;

    private String duties;
    private String requirements;
    private String weOffer;

    private Set<WorkMode> workMode ;
    private JobStart jobStart;
    private Set<ContractType> contractType;
    private EmploymentType employmentType;
    private JobCategory jobCategory;
    private SalaryPeriod salaryPeriod;
    private SalaryType salaryType;
    private EmployerDto employerDto;

    public CreateJobOfferRequest() {
    }
}
