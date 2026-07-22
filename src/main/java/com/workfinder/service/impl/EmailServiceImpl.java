package com.workfinder.service.impl;

import com.workfinder.entity.User;
import com.workfinder.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    @Async
    public void employeeAccountVerification(User user, String siteUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        String verifyUrl = siteUrl + "/api/auth/verify?code=" + user.getVerificationCode();

        Context context = new Context();
        context.setVariable("verifyUrl",verifyUrl);

        String htmlContext = templateEngine.process("email/employee_account_verification.html",context);

        helper.setFrom("mkoszalka0@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Account Activation");
        helper.setText(htmlContext,true);

        javaMailSender.send(message);
    }

    @Override
    @Async
    public void employerAccountVerification(User user, String siteUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        String verifyUrl = siteUrl + "/api/auth/verify?code=" + user.getVerificationCode();

        Context context = new Context();
        context.setVariable("verifyUrl",verifyUrl);
        context.setVariable("firstName",user.getEmployer().getFirstName());

        String htmlContext = templateEngine.process("email/employer_account_verification.html",context);

        helper.setFrom("mkoszalka0@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Account Activation");
        helper.setText(htmlContext,true);

        javaMailSender.send(message);

    }

    @Override
    @Async
    public void resendVerificationEmail(User user, String siteUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        String verifyUrl = siteUrl + "/api/auth/verify?code=" + user.getVerificationCode();

        Context context = new Context();
        context.setVariable("verifyUrl",verifyUrl);

        String htmlContext = templateEngine.process("email/resend_email_verification.html",context);

        helper.setFrom("mkoszalka0@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Account Activation");
        helper.setText(htmlContext,true);
        javaMailSender.send(message);
    }

    @Override
    @Async
    public void forgotPasswordEmail(User user,String siteUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        String verifyToken = siteUrl + "/api/auth/reset-password?token=" + user.getVerificationToken();

        Context context = new Context();
        context.setVariable("token",verifyToken);

        String htmlContext = templateEngine.process("email/reset_password_email.html",context);

        helper.setFrom("mkoszalka0@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Reset Password");
        helper.setText(htmlContext,true);

        javaMailSender.send(message);
    }

    @Override
    @Async
    public void changeEmail(User user, String siteUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        String verify = siteUrl + "/api/auth/email-update?code=" + user.getVerificationCode();

        Context context = new Context();
        context.setVariable("verify",verify);

        String htmlContext = templateEngine.process("email/email_update.html",context);

        helper.setFrom("mkoszalka0@gmail.com");
        helper.setTo(user.getTemporaryEmail());
        helper.setSubject("Change Email");
        helper.setText(htmlContext,true);

        javaMailSender.send(message);


    }
}
