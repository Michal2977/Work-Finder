package com.workfinder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "employee_cv")
public class EmployeeCv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] cvFile;

    @Column(name = "cv_file_name",nullable = false)
    private String cvFileName;

    @ManyToOne()
    @JoinColumn(name = "employee_id")
    private Employee employee;

    public EmployeeCv() {
    }

    public EmployeeCv(byte[] cvFile, String cvFileName, Employee employee) {
        this.cvFile = cvFile;
        this.cvFileName = cvFileName;
        this.employee = employee;
    }
}
