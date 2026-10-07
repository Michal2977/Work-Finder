package com.workfinder.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@Entity
@Table(name = "application_answer")
public class ApplicationAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ElementCollection
    @CollectionTable(name = "application_answer_values",joinColumns = @JoinColumn(name = "application_answer_id"))
    @Column(name = "answer",nullable = false)
    private List<@Size(min = 5,max = 300)String> answer = new ArrayList<>();

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

    public ApplicationAnswer(List<String> answer,
                             ApplicationSubmission applicationSubmission, Application application, User user) {
        this.answer = answer;
        this.applicationSubmission = applicationSubmission;
        this.application = application;
        this.user = user;
    }
}
