package com.workfinder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "employer")
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "nip")
    private Integer nip;

    @Column(name = "phone_number")
    private Integer phoneNumber;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Employer() {
    }

    public Employer(String firstName, String lastName, String companyName, Integer nip, Integer phoneNumber, User user) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.nip = nip;
        this.phoneNumber = phoneNumber;
        this.user = user;
    }
}
