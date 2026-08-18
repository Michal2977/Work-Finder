package com.workfinder.entity;


import com.workfinder.enums.ContactCategory;
import com.workfinder.enums.ContactStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Enumerated(EnumType.STRING)
    @Column(name = "contact_status")
    private ContactStatus contactStatus;

    @Column(name = "contact_category")
    @Enumerated(EnumType.STRING)
    private ContactCategory contactCategory;

    @OneToMany(mappedBy = "contact")
    private List<ContactMessage> messages = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private User user;


    public Contact() {
    }

    public Contact(String title, String description, LocalDateTime sentAt,
                   byte[] picture, ContactStatus contactStatus, ContactCategory contactCategory,
                   List<ContactMessage> messages, User user) {
        this.title = title;
        this.description = description;
        this.sentAt = sentAt;
        this.picture = picture;
        this.contactStatus = contactStatus;
        this.contactCategory = contactCategory;
        this.messages = messages;
        this.user = user;
    }
}
