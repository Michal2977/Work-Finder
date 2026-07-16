package com.workfinder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email",unique = true)
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "is_enabled")
    private boolean isEnabled;

    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinTable(name = "users_roles",joinColumns = @JoinColumn(name = "user_id")
    ,inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> role = new HashSet<>();

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private Employee employee;

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private Employer employer;

    public User() {
    }

    public User(String email, String password, LocalDateTime createAt, LocalDateTime expiresAt,
                String verificationCode, String verificationToken, boolean isEnabled, Set<Role> role,
                Employee employee, Employer employer) {
        this.email = email;
        this.password = password;
        this.createAt = createAt;
        this.expiresAt = expiresAt;
        this.verificationCode = verificationCode;
        this.verificationToken = verificationToken;
        this.isEnabled = isEnabled;
        this.role = role;
        this.employee = employee;
        this.employer = employer;
    }

    public void createRole(Role role){
        this.role.add(role);
    }
}
