package com.workfinder.service;

import com.workfinder.dto.ContactDto;
import com.workfinder.dto.ContactMessageDto;
import com.workfinder.entity.User;
import com.workfinder.request.ChangeContactStatusRequest;
import com.workfinder.request.ContactMessageRequest;
import com.workfinder.request.CreateContactRequest;
import jakarta.mail.MessagingException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ContactService {
    ContactDto sendContactMessage(CreateContactRequest request, MultipartFile file, User user) throws IOException, MessagingException;
    List<ContactDto> findMyReports(String email);
    ContactDto findReportsDetailsById(Long id);
    ContactMessageDto sendRespondMessageAsUser(ContactMessageRequest request, MultipartFile file,
                                               User user, Long id) throws IOException;
    void banUser(Long id) throws MessagingException;
    void unBanUser(Long id) throws MessagingException;
    long amountsOfReports();
    void changeContactStatus(Long id, ChangeContactStatusRequest request) throws MessagingException;
}
