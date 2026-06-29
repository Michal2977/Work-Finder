package com.workfinder.entity;

import com.workfinder.enums.OAuth2UserProvider;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
@Entity
@Table(name = "user_provider")
public class UserProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "provider_id")
    private String providerId;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider")
    private OAuth2UserProvider provider;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    public UserProvider() {
    }

    public UserProvider(Long id, String providerId, OAuth2UserProvider provider, User user) {
        this.id = id;
        this.providerId = providerId;
        this.provider = provider;
        this.user = user;
    }
}
