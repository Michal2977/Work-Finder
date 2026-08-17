package com.workfinder.service;

import com.workfinder.dto.ContactDto;
import com.workfinder.entity.Contact;
import com.workfinder.entity.User;
import jakarta.mail.MessagingException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface EmailService {
    void employeeAccountVerification(User user,String siteUrl) throws MessagingException;
    void  employerAccountVerification(User user,String siteUrl) throws MessagingException;
    void resendVerificationEmail(User user,String siteUrl)throws  MessagingException;
    void forgotPasswordEmail(User user,String siteUrl) throws MessagingException;
    void changeEmail(User user,String siteUrl) throws MessagingException;
    void sendContactEmail(User user, Contact contact, String fileName,byte[] fileBytes) throws MessagingException;
}
