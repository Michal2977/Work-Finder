package com.workfinder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "phone_number")
    private Integer phoneNumber;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Employee() {
    }

    public Employee(String firstName, String lastName, Integer phoneNumber, User user) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.user = user;
    }
}
