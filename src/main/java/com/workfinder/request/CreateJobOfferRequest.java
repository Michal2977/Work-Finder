package com.workfinder.request;

import com.workfinder.dto.EmployerDto;
import com.workfinder.enums.*;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
public class CreateJobOfferRequest {

    private String position;
    private String description;
    private BigDecimal salary;
    private String location;
    private String workSchedule;
    private String companyName;
    private String shiftSystem;
    private String workingHours;
    private Boolean nightShift;
    private String aboutCompany;
    private String salarySystem;
    private String phoneNumber;
    private Long expiresAt;

    private String duties;
    private String requirements;
    private String weOffer;

    private Set<WorkMode> workMode ;
    private JobStart jobStart;
    private Set<ContractType> contractType;
    private EmploymentType employmentType;
    private JobCategory jobCategory;
    private SalaryPeriod salaryPeriod;
    private Set<Benefit> benefit;
    private SalaryType salaryType;

    private EmployerDto employerDto;

    public CreateJobOfferRequest() {
    }
}
