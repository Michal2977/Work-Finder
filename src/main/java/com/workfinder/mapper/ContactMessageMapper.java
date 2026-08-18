package com.workfinder.mapper;

import com.workfinder.dto.ContactMessageDto;
import com.workfinder.entity.ContactMessage;

import java.util.Base64;

public class ContactMessageMapper {
    public static ContactMessageDto contactMessageDto(ContactMessage contactMessage){

        String base64Picture = null;
        if (contactMessage.getPicture() != null){
            base64Picture = Base64.getEncoder().encodeToString(contactMessage.getPicture());
        }
        return new ContactMessageDto(contactMessage.getId(),contactMessage.getMessage(),contactMessage.getRespondAt()
        ,base64Picture
        ,UserMapper.userDto(contactMessage.getUser()),ContactMapper.contactDto(contactMessage.getContact()));
    }
}
