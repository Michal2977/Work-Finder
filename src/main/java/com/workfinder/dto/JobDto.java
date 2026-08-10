package com.workfinder.dto;

import com.workfinder.enums.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
public class JobDto {

    private Long id;
    private String position;
    private String description;
    private BigDecimal salary;
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
    private String companyName;
    private String shiftSystem;
    private String workingHours;
    private Boolean nightShift;
    private String aboutCompany;
    private String salarySystem;
    private Set<Benefit> benefit;
    private String phoneNumber;
    private LocalDateTime expiresAt;
    private EmployerDto employerDto;

    public JobDto() {
    }

    public JobDto(Long id, String position, String description, BigDecimal salary, String location,
                  Set<ContractType> contractType, String workSchedule, EmploymentType employmentType,
                  JobStart jobStart, Set<WorkMode> workMode, String duties, String requirements, String weOffer,
                  JobCategory jobCategory, SalaryPeriod salaryPeriod, SalaryType salaryType, String picture
            , String companyName, String shiftSystem, String workingHours, Boolean nightShift, String aboutCompany,
                  String salarySystem, Set<Benefit> benefit, String phoneNumber, LocalDateTime expirestAt, EmployerDto employerDto) {
        this.id = id;
        this.position = position;
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
        this.companyName = companyName;
        this.shiftSystem = shiftSystem;
        this.workingHours = workingHours;
        this.nightShift = nightShift;
        this.aboutCompany = aboutCompany;
        this.salarySystem = salarySystem;
        this.benefit = benefit;
        this.phoneNumber = phoneNumber;
        this.expiresAt = expirestAt;
        this.employerDto = employerDto;
    }
}
