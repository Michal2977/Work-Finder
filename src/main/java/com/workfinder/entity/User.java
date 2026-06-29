package com.workfinder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.security.Provider;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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

    @Column(name = "is_enabled")
    private boolean isEnabled;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "reset_password_token")
    private String resetPasswordToken;

    @Column(name = "display_name")
    private String displayName;

    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinTable(name = "users_roles",joinColumns = @JoinColumn(name = "user_id")
    ,inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> role = new HashSet<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<UserProvider> providers = new ArrayList<>();

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private Employee employee;

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private Employer employer;

    public User() {
    }

    public User(String email, String password, boolean isEnabled, LocalDateTime createAt, LocalDateTime expiresAt,
                String verificationCode, String resetPasswordToken, String displayName, Set<Role> role,
                List<UserProvider> providers, Employee employee, Employer employer) {
        this.email = email;
        this.password = password;
        this.isEnabled = isEnabled;
        this.createAt = createAt;
        this.expiresAt = expiresAt;
        this.verificationCode = verificationCode;
        this.resetPasswordToken = resetPasswordToken;
        this.displayName = displayName;
        this.role = role;
        this.providers = providers;
        this.employee = employee;
        this.employer = employer;
    }

    public void createRole(Role role){
        this.role.add(role);
    }

    public void addProvider(UserProvider provider){
        this.providers.add(provider);
        provider.setUser(this);
    }
}
