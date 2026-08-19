package com.workfinder.mapper;

import com.workfinder.dto.ContactDto;
import com.workfinder.entity.Contact;

import java.util.Base64;

public class ContactMapper {
    public static ContactDto contactDto(Contact contact){

        String base64Picture =null;
        if (contact.getPicture() != null){
            base64Picture = Base64.getEncoder().encodeToString(contact.getPicture());
        }

        return new ContactDto(contact.getId(),contact.getTitle(),contact.getDescription(),
               base64Picture,contact.getContactStatus(),contact.getContactCategory(),
                contact.getSentAt() ,contact.getMessages().stream().map(ContactMessageMapper :: contactMessageDto)
                .toList(),UserMapper.userDto(contact.getUser()));
    }
}
