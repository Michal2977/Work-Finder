package com.workfinder.dto;

import com.workfinder.entity.ContactMessage;
import com.workfinder.enums.ContactCategory;
import com.workfinder.enums.ContactStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ContactDto {

    private Long id;
    private String title;
    private String description;
    private String picture;
    private ContactStatus contactStatus;
    private ContactCategory contactCategory;
    private LocalDateTime sentAt;
    private List<ContactMessageDto> contactMessageDto;
    private UserDto userDto;

    public ContactDto() {
    }

    public ContactDto(Long id, String title, String description, String picture, ContactStatus contactStatus,
                      ContactCategory contactCategory, LocalDateTime sentAt, List<ContactMessageDto> contactMessageDto, UserDto userDto) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.picture = picture;
        this.contactStatus = contactStatus;
        this.contactCategory = contactCategory;
        this.sentAt = sentAt;
        this.contactMessageDto = contactMessageDto;
        this.userDto = userDto;
    }
}
