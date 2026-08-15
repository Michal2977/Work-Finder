package com.workfinder.entity;

import com.workfinder.enums.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "job")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title",nullable = false,length = 50)
    @Size(min = 3,max = 50)
    private String position;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "shift_system",length = 50)
    @Size(min = 3,max = 50)
    private String shiftSystem;

    @Column(name = "description",length = 5000 ,columnDefinition = "TEXT")
    @Size(min = 10,max = 5000)
    private String description;

    @Column(name = "salary",nullable = false)
    @Digits(integer = 8,fraction = 2)
    private BigDecimal salary;

    @Column(name = "location",nullable = false,length = 40)
    @Size(min = 2,max = 40)
    private String location;

    @Column(name = "contract_type",nullable = false)
    @ElementCollection(targetClass = ContractType.class)
    @CollectionTable(name = "contract_types")
    @Enumerated(EnumType.STRING)
    private Set<ContractType> contractType = new HashSet<>();

    @Column(name = "work_schedule",length = 40)
    @Size(min = 5,max = 40)
    private String workSchedule;

    @Column(name = "job_category")
    @Enumerated(EnumType.STRING)
    @NotNull
    private JobCategory jobCategory;

    @Column(name = "working_hours",length = 40)
    @Size(min = 5,max = 40)
    private String workingHours;

    @Column(name = "employment_type")
    @Enumerated(EnumType.STRING)
    @NotNull
    private EmploymentType employmentType;

    @Column(name = "job_start")
    @Enumerated(EnumType.STRING)
    private JobStart jobStart;

    @Column(name = "work_modes")
    @ElementCollection(targetClass = WorkMode.class)
    @CollectionTable(name = "work_modes",joinColumns = @JoinColumn(name = "job_id"))
    @Enumerated(EnumType.STRING)
    @NotNull
    private Set<WorkMode> workMode = new HashSet<>();

    @Column(name = "salary_period")
    @Enumerated(EnumType.STRING)
    @NotNull
    private SalaryPeriod salaryPeriod;

    @Column(name = "salary_type")
    @Enumerated(EnumType.STRING)
    @NotNull
    private SalaryType salaryType;

    @Column(name = "duties",length = 5000 ,columnDefinition = "TEXT")
    @Size(min = 10,max = 5000)
    private String duties;

    @Column(name = "requirements",length = 5000 ,columnDefinition = "TEXT")
    @Size(min = 10,max = 5000)
    private String requirements;

    @Column(name = "we_offer",length = 5000 ,columnDefinition = "TEXT")
    @Size(min = 10,max = 5000)
    private String weOffer;

    @Column(name = "night_shift",length = 3)
    @NotNull
    private Boolean nightShift;

    @Column(name = "company_name",nullable = false,length = 100)
    @Size(min = 2,max = 100)
    private String companyName;

    @Column(name = "remuneration_system",length = 100)
    @Size(min = 5,max = 100)
    private String salarySystem;

    @Column(name = "about_company",length = 4000 ,columnDefinition = "TEXT")
    @Size(min = 20,max = 4000)
    private String aboutCompany;

    @Column(name = "benefit")
    @ElementCollection(targetClass = Benefit.class)
    @CollectionTable(name = "benefits",joinColumns = @JoinColumn(name = "job_id"))
    @Enumerated(EnumType.STRING)
    private Set<Benefit> benefit;

    @Column(name = "phone_number",length = 20)
    @Size(min = 9,max = 20)
    @Pattern(regexp = "^\\+?[0-9]{9,20}$")
    private String phoneNumber;



    @Column(name = "deleted")
    private boolean deleted;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[]picture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id")
    private Employer employer;


    public Job() {
    }

    public Job(String position, LocalDateTime createAt, LocalDateTime expiresAt, String shiftSystem, String description,
               BigDecimal salary, String location, Set<ContractType> contractType, String workSchedule,
               JobCategory jobCategory, String workingHours, EmploymentType employmentType, JobStart jobStart,
               Set<WorkMode> workMode, SalaryPeriod salaryPeriod, SalaryType salaryType, String duties, String requirements,
               String weOffer, Boolean nightShift, String companyName, String salarySystem, String aboutCompany,
               Set<Benefit> benefit, String phoneNumber, byte[] picture
               ,boolean deleted,LocalDateTime deletedAt,Employer employer) {
        this.position = position;
        this.createAt = createAt;
        this.expiresAt = expiresAt;
        this.shiftSystem = shiftSystem;
        this.description = description;
        this.salary = salary;
        this.location = location;
        this.contractType = contractType;
        this.workSchedule = workSchedule;
        this.jobCategory = jobCategory;
        this.workingHours = workingHours;
        this.employmentType = employmentType;
        this.jobStart = jobStart;
        this.workMode = workMode;
        this.salaryPeriod = salaryPeriod;
        this.salaryType = salaryType;
        this.duties = duties;
        this.requirements = requirements;
        this.weOffer = weOffer;
        this.nightShift = nightShift;
        this.companyName = companyName;
        this.salarySystem = salarySystem;
        this.aboutCompany = aboutCompany;
        this.benefit = benefit;
        this.phoneNumber = phoneNumber;
        this.picture = picture;
        this.deleted = deleted;
        this.deletedAt = deletedAt;
        this.employer = employer;
    }


}
