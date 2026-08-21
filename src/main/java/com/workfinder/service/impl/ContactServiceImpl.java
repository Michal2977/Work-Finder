package com.workfinder.service.impl;

import com.workfinder.dto.ContactDto;
import com.workfinder.dto.ContactMessageDto;
import com.workfinder.entity.Contact;
import com.workfinder.entity.ContactMessage;
import com.workfinder.entity.User;
import com.workfinder.enums.ContactStatus;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.exception.UserMessageNotAllowedException;
import com.workfinder.mapper.ContactMapper;
import com.workfinder.mapper.ContactMessageMapper;
import com.workfinder.repository.ContactMessageRepository;
import com.workfinder.repository.ContactRepository;
import com.workfinder.request.ContactMessageRequest;
import com.workfinder.request.CreateContactRequest;
import com.workfinder.service.ContactService;
import jakarta.mail.MessagingException;
import jdk.jfr.ContentType;
import lombok.Setter;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class ContactServiceImpl implements ContactService {

    private final ContactRepository contactRepository;
    private final  EmailServiceImpl emailService;
    private final AuthServiceImpl authService;
    private final ContactMessageRepository contactMessageRepository;

    public ContactServiceImpl(ContactRepository contactRepository, EmailServiceImpl emailService, AuthServiceImpl authService, ContactMessageRepository contactMessageRepository) {
        this.contactRepository = contactRepository;
        this.emailService = emailService;
        this.authService = authService;
        this.contactMessageRepository = contactMessageRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYER','EMPLOYEE')")
    @Override
    public ContactDto sendContactMessage(CreateContactRequest request, MultipartFile file, User user) throws IOException, MessagingException {
        Contact contact = new Contact();
        contact.setTitle(request.getTitle());
        contact.setDescription(request.getDescription());
        contact.setUser(user);
        contact.setContactStatus(ContactStatus.SENT);
        contact.setContactCategory(request.getContactCategory());
        contact.setNumberOfReports(contact.getNumberOfReports() + 1);
        contact.setSentAt(LocalDateTime.now());
        user.getContacts().add(contact);

        byte[] fileBytes = null;
        String fileName = null;

        if (file != null && !file.isEmpty()){
            String cleanPath = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));

            if (cleanPath.contains("..")){
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
            fileName = file.getOriginalFilename();
            fileBytes = file.getBytes();
            contact.setPicture(fileBytes);
        }

        contactRepository.save(contact);
        emailService.sendContactEmail(user,contact,fileName,fileBytes);

        return ContactMapper.contactDto(contact);
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYER','EMPLOYEE')")
    @Override
    public List<ContactDto> findMyReports(String email){
        User user = authService.findByEmail(email);

        if (user.hasRole("EMPLOYER") || user.hasRole("EMPLOYEE")){
          return contactRepository.findAll().stream().filter(contact -> contact.getUser().getId()
                  .equals(user.getId())).map(ContactMapper :: contactDto).toList();
        }else if (user.hasRole("ADMIN")){
            return contactRepository.findAll().stream().map(ContactMapper :: contactDto).toList();
        }
        return List.of();
    }

    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYER','EMPLOYEE')")
    @Override
    public ContactDto findReportsDetailsById(Long id){
        Contact contact = contactRepository.findById(id).get();
        return ContactMapper.contactDto(contact);
    }

    @PreAuthorize("hasRole('ADMIN')")
    public ContactMessageDto sendRespondMessageAsAdmin(ContactMessageRequest request,MultipartFile file
    ,User user,Long id) throws IOException, MessagingException {

        Contact contact = contactRepository.getReferenceById(id);

        ContactMessage contactMessage = new ContactMessage();
        contactMessage.setMessage(request.getMessage());
        contactMessage.setRespondAt(LocalDateTime.now());
        contactMessage.setUser(user);
        contactMessage.setContact(contact);

        contact.getMessages().add(contactMessage);
        contact.setAdminMessageCount(contact.getAdminMessageCount() + 1);

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
            if (file.getSize() > 10 * 1024 * 1024){
                throw new InvalidFileException("Maximum file size is 10 MB.");
            }
            contactMessage.setPicture(file.getBytes());
        }

        contactMessageRepository.save(contactMessage);
        emailService.adminRespondNotification(contact);
        return ContactMessageMapper.contactMessageDto(contactMessage);
    }

    @PreAuthorize("hasAnyRole('EMPLOYER','EMPLOYEE')")
    @Override
    public ContactMessageDto sendRespondMessageAsUser(ContactMessageRequest request,MultipartFile file,
                                                      User user,Long id) throws IOException {
        Contact contact = contactRepository.getReferenceById(id);

        if ( contact.getUserMessageCount() > 0 && contact.getAdminMessageCount() <= contact.getUserMessageCount()){
            throw new UserMessageNotAllowedException("You cannot send another message until an administrator responds");
        }

        ContactMessage contactMessage = new ContactMessage();
        contactMessage.setMessage(request.getMessage());
        contactMessage.setRespondAt(LocalDateTime.now());
        contactMessage.setUser(user);
        contactMessage.setContact(contact);
        contact.setUserMessageCount(contact.getUserMessageCount() + 1);
        contact.getMessages().add(contactMessage);


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
            if (file.getSize() > 10 * 1024 * 1024){
                throw new InvalidFileException("Maximum file size is 10 MB.");
            }

            contactMessage.setPicture(file.getBytes());
        }


        contactMessageRepository.save(contactMessage);
        return ContactMessageMapper.contactMessageDto(contactMessage);
    }
}


