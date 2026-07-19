package com.workfinder.entity;

import com.workfinder.enums.OAuth2UserProvider;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_provider")
public class UserProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "provider")
    @Enumerated(EnumType.STRING)
    private OAuth2UserProvider provider;

    @Column(name = "provider_id")
    private String providerId;

    @ManyToOne(fetch = FetchType.LAZY,optional = false)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;


    public UserProvider() {
    }

    public UserProvider(OAuth2UserProvider provider, String providerId, User user) {
        this.provider = provider;
        this.providerId = providerId;
        this.user = user;
    }
}
