package com.workfinder.service.impl;

import com.workfinder.dto.ContactDto;
import com.workfinder.entity.Contact;
import com.workfinder.entity.User;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.mapper.ContactMapper;
import com.workfinder.repository.ContactRepository;
import com.workfinder.request.CreateContactRequest;
import com.workfinder.service.ContactService;
import jakarta.mail.MessagingException;
import lombok.Setter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final  EmailServiceImpl emailService;

    public ContactServiceImpl(ContactRepository contactRepository, EmailServiceImpl emailService) {
        this.contactRepository = contactRepository;
        this.emailService = emailService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYER','EMPLOYEE')")
    @Override
    public ContactDto sendContactMessage(CreateContactRequest request, MultipartFile file, User user) throws IOException, MessagingException {
        Contact contact = new Contact();
        contact.setTitle(request.getTitle());
        contact.setDescription(request.getDescription());
        contact.setUser(user);
        contact.setSentAt(LocalDateTime.now());
        user.getContacts().add(contact);

        if (file != null && !file.isEmpty()){
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            if (fileName.contains("..")){
                throw new InvalidFileException("Invalid file name");
            }
            String contentType = file.getContentType();
            if (contentType == null || !(contentType.equals("image/jpeg") || contentType.equals("image/png")
            || contentType.equals("image/webp"))){
                throw new InvalidFileException("Only image files are allowed");
            }

            if (file.getSize() > 10 *1024 * 1024){
                throw new InvalidFileException("Maximum file size is 10 MB.");
            }
            contact.setPicture(file.getBytes());
        }

        contactRepository.save(contact);
        emailService.sendContactEmail(user,contact,file);

        return ContactMapper.contactDto(contact);
    }
}
