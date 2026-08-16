package com.workfinder.service;

import com.workfinder.dto.ContactDto;
import com.workfinder.entity.User;
import com.workfinder.request.CreateContactRequest;
import jakarta.mail.MessagingException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ContactService {
    ContactDto sendContactMessage(CreateContactRequest request, MultipartFile file, User user) throws IOException, MessagingException;
}
