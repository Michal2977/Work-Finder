package com.workfinder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

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

    @Column(name = "email",unique = true,length = 254,nullable = false)
    @Size(min = 5 , max = 254)
    private String email;

    @Column(name = "password",nullable = false,length = 64)
    @Size(min = 8,max = 64)
    private String password;

    @Column(name = "create_at")
    private LocalDateTime createAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "verification_token")
    private String verificationToken;

    @Column(name = "display_name")
    private String displayName;

    @Column(name = "is_enabled")
    private boolean isEnabled;

    @Column(name = "temporary_email", length = 254)
    @Size(min = 5,max = 254)
    private String temporaryEmail;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] picture;

    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.DETACH)
    @JoinTable(name = "users_roles",joinColumns = @JoinColumn(name = "user_id")
    ,inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> role = new HashSet<>();

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private Employee employee;

    @OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
    private Employer employer;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<UserProvider> providers = new ArrayList<>();

    public User() {
    }

    public User(String email, String password, LocalDateTime createAt, LocalDateTime expiresAt, String verificationCode,
                String verificationToken, String displayName, boolean isEnabled, String temporaryEmail,
                byte[] picture, Set<Role> role, Employee employee, Employer employer, List<UserProvider> providers) {
        this.email = email;
        this.password = password;
        this.createAt = createAt;
        this.expiresAt = expiresAt;
        this.verificationCode = verificationCode;
        this.verificationToken = verificationToken;
        this.displayName = displayName;
        this.isEnabled = isEnabled;
        this.temporaryEmail = temporaryEmail;
        this.picture = picture;
        this.role = role;
        this.employee = employee;
        this.employer = employer;
        this.providers = providers;
    }

    public void createRole(Role role){
        this.role.add(role);
    }
    public  boolean hasRole(String roles){
        return role.stream().anyMatch(r -> r.getRole().equalsIgnoreCase(roles));
    }

    public void addProvider(UserProvider provider){
        this.providers.add(provider);
        provider.setUser(this);
    }
}
