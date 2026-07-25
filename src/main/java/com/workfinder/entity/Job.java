package com.workfinder.entity;

import com.workfinder.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

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
    @Enumerated(EnumType.STRING)
    private ContractType contractType;

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
    @Enumerated(EnumType.STRING)
    private WorkMode workMode;

    @Column(name = "duties")
    private String duties;

    @Column(name = "requirements")
    private String requirements;

    @Column(name = "we_offer")
    private String weOffer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employer_id")
    private Employer employer;


    public Job() {
    }

    public Job(String title, String description, Double salary, String location, ContractType contractType,
               String workSchedule, JobCategory jobCategory, EmploymentType employmentType, JobStart jobStart,
               WorkMode workMode, String duties, String requirements, String weOffer, Employer employer) {
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
        this.duties = duties;
        this.requirements = requirements;
        this.weOffer = weOffer;
        this.employer = employer;
    }
}
