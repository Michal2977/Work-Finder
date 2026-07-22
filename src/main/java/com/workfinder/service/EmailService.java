package com.workfinder.service;

import com.workfinder.entity.User;
import jakarta.mail.MessagingException;

public interface EmailService {
    void employeeAccountVerification(User user,String siteUrl) throws MessagingException;
    void  employerAccountVerification(User user,String siteUrl) throws MessagingException;
    void resendVerificationEmail(User user,String siteUrl)throws  MessagingException;
    void forgotPasswordEmail(User user,String siteUrl) throws MessagingException;
    void changeEmail(User user,String siteUrl) throws MessagingException;
}
