package com.workfinder.entity;

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

    @ManyToOne
    @JoinColumn(name = "job_id",nullable = false)
    private Job job;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;


    public QuickApplication() {
    }

    public QuickApplication(LocalDateTime appliedAt, Job job, User user) {
        this.appliedAt = appliedAt;
        this.job = job;
        this.user = user;
    }
}
