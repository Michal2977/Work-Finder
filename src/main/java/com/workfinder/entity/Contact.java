package com.workfinder.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "contact")
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title",nullable = false,length = 50)
    @Size(min = 3, max = 50)
    private String title;

    @Column(name = "description" ,length = 5000,nullable = false, columnDefinition = "TEXT")
    @Size(min = 10,max = 5000)
    private String description;

    @Column(name = "sent_at")
    private LocalDateTime sentAt;

    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] picture;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;


    public Contact() {
    }

    public Contact(String title, String description, LocalDateTime sentAt, byte[] picture, User user) {
        this.title = title;
        this.description = description;
        this.sentAt = sentAt;
        this.picture = picture;
        this.user = user;
    }
}
