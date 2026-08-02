package com.workfinder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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

    @Column(name = "first_name",length = 40)
    @Size(min = 2,max = 40)
    private String firstName;

    @Column(name = "last_name" ,length = 40)
    @Size(min = 2,max = 40)
    private String lastName;

    @Column(name = "phone_number",length = 15)
    @Pattern(regexp = "^\\+?[0-9]{9,15}$")
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Employee() {
    }

    public Employee(String firstName, String lastName, String phoneNumber, User user) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.user = user;
    }
}
