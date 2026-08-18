package com.workfinder.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "contact_message")
public class ContactMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message" ,length = 5000, columnDefinition = "TEXT")
    @NotBlank
    @Size(max = 5000)
    private String message;

    @Column(name = "respond_at",nullable = false)
    private LocalDateTime respondAt;

    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] picture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contact_id",nullable = false)
    private Contact contact;

    public ContactMessage() {
    }

    public ContactMessage(String message, LocalDateTime respondAt, byte[] picture, User user, Contact contact) {
        this.message = message;
        this.respondAt = respondAt;
        this.picture = picture;
        this.user = user;
        this.contact = contact;
    }
}
