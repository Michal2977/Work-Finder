package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ContactMessageDto {

    private Long id;
    private String message;
    private LocalDateTime respondAt;
    private String picture;
    private UserDto userDto;


    public ContactMessageDto() {
    }

    public ContactMessageDto(Long id, String message, LocalDateTime respondAt, String picture, UserDto userDto) {
        this.id = id;
        this.message = message;
        this.respondAt = respondAt;
        this.picture = picture;
        this.userDto = userDto;

    }
}
