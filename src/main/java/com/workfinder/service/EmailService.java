package com.workfinder.service;

import com.workfinder.entity.User;
import jakarta.mail.MessagingException;

public interface EmailService {

    void sendVerificationEmailForEmployee(User user,String siteUrl) throws MessagingException;
    void sendVerificationEmailForEmployer(User user,String siteUrl) throws MessagingException;
    void resendVerificationEmail(User user,String siteUrl) throws MessagingException;
    void sendResetPasswordEmail(User user,String siteUrl) throws MessagingException;
}
