package com.workfinder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "employer")
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name",length = 40,nullable = false)
    @Size(min = 2,max = 40 )
    private String firstName;

    @Column(name = "last_name" ,length = 40,nullable = false)
    @Size(min = 2,max = 40)
    private String lastName;

    @Column(name = "company_name",length = 100)
    @Size(min = 1,max = 100)
    private String companyName;

    @Column(name = "nip" ,length = 10,nullable = false)
    @Pattern(regexp = "^\\d{10}$")
    private String nip;



    @Column(name = "phone_number",length = 15,nullable = false)
    @Pattern(regexp = "^\\+?[0-9]{9,15}$")
    private String phoneNumber;

    @OneToMany(mappedBy = "employer",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Job> jobs = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Employer() {
    }

    public Employer(String firstName, String lastName, String companyName, String nip,
                    String phoneNumber, List<Job> jobs, User user) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyName = companyName;
        this.nip = nip;
        this.phoneNumber = phoneNumber;
        this.jobs = jobs;
        this.user = user;
    }
}
