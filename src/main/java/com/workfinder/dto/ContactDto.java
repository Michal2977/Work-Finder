package com.workfinder.dto;

import com.workfinder.enums.ContactStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactDto {

    private Long id;
    private String title;
    private String description;
    private String picture;
    private ContactStatus contactStatus;
    private UserDto userDto;

    public ContactDto() {
    }

    public ContactDto(Long id, String title, String description, String picture, ContactStatus contactStatus, UserDto userDto) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.picture = picture;
        this.contactStatus = contactStatus;
        this.userDto = userDto;
    }
}
