package com.workfinder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

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


    @OneToMany(fetch = FetchType.LAZY,cascade = CascadeType.ALL,mappedBy = "employee")
    private List<EmployeeCv> employeeCv = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Employee() {
    }

    public Employee(String firstName, String lastName, String phoneNumber, List<EmployeeCv> employeeCv, User user) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.employeeCv = employeeCv;
        this.user = user;
    }
}
