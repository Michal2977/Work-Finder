package com.workfinder.entity;

import com.workfinder.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "application_status")
    private ApplicationStatus applicationStatus;

    @OneToMany(mappedBy = "applicationSubmission")
    private List<ApplicationAnswer> applicationAnswers = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id",nullable = false)
    private Job job;

    public ApplicationSubmission() {
    }

    public ApplicationSubmission(byte[] sendCv, String sendCvName, LocalDateTime sentAt,
                                 ApplicationStatus applicationStatus, List<ApplicationAnswer> applicationAnswers,
                                 User user, Job job) {
        this.sendCv = sendCv;
        this.sendCvName = sendCvName;
        this.sentAt = sentAt;
        this.applicationStatus = applicationStatus;
        this.applicationAnswers = applicationAnswers;
        this.user = user;
        this.job = job;
    }
}
