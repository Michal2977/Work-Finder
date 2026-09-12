package com.workfinder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@Entity
@Table(name = "favorite_job")
public class FavoriteJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "job_id",nullable = false)
    private Job job;


    public FavoriteJob() {
    }

    public FavoriteJob(User user, Job job) {
        this.user = user;
        this.job = job;
    }
}
