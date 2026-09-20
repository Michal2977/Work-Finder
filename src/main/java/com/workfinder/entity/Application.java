package com.workfinder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "application")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question",nullable = false)
    private String question;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    public Application() {
    }

    public Application(String question, Job job) {
        this.question = question;
        this.job = job;
    }
}
