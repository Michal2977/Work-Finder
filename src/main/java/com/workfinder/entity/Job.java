package com.workfinder.entity;

import com.workfinder.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "salary")
    private Double salary;

    @Column(name = "location")
    private String location;

    @Column(name = "contract_type")
    @ElementCollection(targetClass = ContractType.class)
    @CollectionTable(name = "contract_types")
    @Enumerated(EnumType.STRING)
    private Set<ContractType> contractType = new HashSet<>();

    @Column(name = "work_schedule")
    private String workSchedule;

    @Column(name = "job_category")
    @Enumerated(EnumType.STRING)
    private JobCategory jobCategory;

    @Column(name = "employment_type")
    @Enumerated(EnumType.STRING)
    private EmploymentType employmentType;

    @Column(name = "job_start")
    @Enumerated(EnumType.STRING)
    private JobStart jobStart;

    @Column(name = "work_mode")
    @ElementCollection(targetClass = WorkMode.class)
    @CollectionTable(name = "work_modes")
    @Enumerated(EnumType.STRING)
    private Set<WorkMode> workMode = new HashSet<>();

    @Column(name = "salary_period")
    @Enumerated(EnumType.STRING)
    private SalaryPeriod salaryPeriod;

    @Column(name = "salary_type")
    @Enumerated(EnumType.STRING)
    private SalaryType salaryType;

    @Column(name = "duties")
    private String duties;

    @Column(name = "requirements")
    private String requirements;

    @Column(name = "we_offer")
    private String weOffer;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[]picture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id")
    private Employer employer;


    public Job() {
    }

    public Job(String title, String description, Double salary, String location, Set<ContractType> contractType,
               String workSchedule, JobCategory jobCategory, EmploymentType employmentType,
               JobStart jobStart, Set<WorkMode> workMode, SalaryPeriod salaryPeriod, SalaryType salaryType,
               String duties, String requirements, String weOffer, byte[] picture, Employer employer) {
        this.title = title;
        this.description = description;
        this.salary = salary;
        this.location = location;
        this.contractType = contractType;
        this.workSchedule = workSchedule;
        this.jobCategory = jobCategory;
        this.employmentType = employmentType;
        this.jobStart = jobStart;
        this.workMode = workMode;
        this.salaryPeriod = salaryPeriod;
        this.salaryType = salaryType;
        this.duties = duties;
        this.requirements = requirements;
        this.weOffer = weOffer;
        this.picture = picture;
        this.employer = employer;
    }
}
