package com.workfinder.request;

import com.workfinder.dto.EmployerDto;
import com.workfinder.enums.*;
import lombok.Getter;

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

    private WorkMode workMode;
    private JobStart jobStart;
    private ContractType contractType;
    private EmploymentType employmentType;
    private JobCategory jobCategory;
    private EmployerDto employerDto;

    public CreateJobOfferRequest() {
    }
}
