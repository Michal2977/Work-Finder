package com.workfinder.entity;

import com.workfinder.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "application_submission")
public class ApplicationSubmission {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB",nullable = false)
    private byte[] sendCv;

    @Column(name = "send_cv_name",nullable = false)
    private String sendCvName;

    @Enumerated(EnumType.STRING)
    @Column(name = "application_status")
    private ApplicationStatus applicationStatus;


    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id",nullable = false)
    private Job job;

    public ApplicationSubmission() {
    }

    public ApplicationSubmission(byte[] sendCv, String sendCvName, ApplicationStatus applicationStatus, User user, Job job) {
        this.sendCv = sendCv;
        this.sendCvName = sendCvName;
        this.applicationStatus = applicationStatus;
        this.user = user;
        this.job = job;
    }
}
