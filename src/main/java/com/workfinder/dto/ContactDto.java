package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactDto {

    private Long id;
    private String title;
    private String description;
    private String picture;
    private UserDto userDto;

    public ContactDto() {
    }

    public ContactDto(Long id, String title, String description, String picture, UserDto userDto) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.picture = picture;
        this.userDto = userDto;
    }
}
