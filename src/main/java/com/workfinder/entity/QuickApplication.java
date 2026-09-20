package com.workfinder.entity;

import com.workfinder.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "quick_application")
public class QuickApplication {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "applied_at")
    private LocalDateTime appliedAt;


    @Lob
    @Column(columnDefinition = "MEDIUMBLOB",nullable = false)
    private byte[] sendCv;

    @Column(name = "send_cv_name")
    private String sendCvName;

    @Enumerated(EnumType.STRING)
    @Column(name = "application_status")
    private ApplicationStatus applicationStatus;

    @ManyToOne
    @JoinColumn(name = "job_id",nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;


    public QuickApplication() {
    }

    public QuickApplication(LocalDateTime appliedAt, byte[] sendCv, String sendCvName,
                            ApplicationStatus applicationStatus, Job job, User user) {
        this.appliedAt = appliedAt;
        this.sendCv = sendCv;
        this.sendCvName = sendCvName;
        this.applicationStatus = applicationStatus;
        this.job = job;
        this.user = user;
    }
}
