package com.workfinder.entity;

import com.workfinder.enums.ApplicationField;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "application")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection
    @CollectionTable(name = "application_question", joinColumns = @JoinColumn(name = "application_id"))
    @Column(name = "question")
    private List<@Size(min = 5,max = 500) String> question = new ArrayList<>();

    @ElementCollection
    @Enumerated(EnumType.STRING)
    private Set<ApplicationField> applicationField = new HashSet<>();

    @OneToOne
    @JoinColumn(name = "job_id", nullable = false,unique = true)
    private Job job;

    public Application() {
    }

    public Application(List<String> question, Set<ApplicationField> applicationField, Job job) {
        this.question = question;
        this.applicationField = applicationField;
        this.job = job;
    }
}
