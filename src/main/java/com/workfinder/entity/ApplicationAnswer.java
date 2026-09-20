package com.workfinder.entity;

import com.workfinder.enums.ApplicationStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "application_answer")
public class ApplicationAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "answer",nullable = false)
    private String answer;


    @ManyToOne
    @JoinColumn(name = "application_submission_id",nullable = false)
    private ApplicationSubmission  applicationSubmission;

    @ManyToOne
    @JoinColumn(name = "application_id",nullable = false)
    private Application application;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    public ApplicationAnswer() {
    }

    public ApplicationAnswer(String answer, ApplicationSubmission applicationSubmission, Application application, User user) {
        this.answer = answer;
        this.applicationSubmission = applicationSubmission;
        this.application = application;
        this.user = user;
    }
}
