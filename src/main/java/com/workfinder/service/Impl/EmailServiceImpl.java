package com.workfinder.service.Impl;

import com.workfinder.entity.User;
import com.workfinder.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
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
    public void sendVerificationEmailForEmployee(User user, String siteUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        String verifyLink = siteUrl + "/api/auth/verify?code=" + user.getVerificationCode();

        Context context = new Context();
        context.setVariable("verifyUrl",verifyLink);

        String htmlContext = templateEngine.process("email/verification_email_employee.html",context);

        helper.setFrom("mkoszalka0@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Account Verification");
        helper.setText(htmlContext,true);

        javaMailSender.send(message);
    }

    @Override
    @Async
    public void sendVerificationEmailForEmployer(User user, String siteUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        String verifyLink = siteUrl + "/api/auth/verify?code=" + user.getVerificationCode();

        Context context = new Context();
        context.setVariable("verifyUrl",verifyLink);
        context.setVariable("firstName",user.getEmployer().getFirstName());

        String htmlContext = templateEngine.process("email/verification_email_employer.html",context);

        helper.setFrom("mkoszalka0@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Account Verification");
        helper.setText(htmlContext,true);
        javaMailSender.send(message);
    }

    @Override
    @Async
    public void resendVerificationEmail(User user, String siteUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        String verifyLink = siteUrl + "/api/auth/verify?code=" + user.getVerificationCode();

        Context context = new Context();
        context.setVariable("verifyUrl",verifyLink);

        String htmlContext  = templateEngine.process("email/resend_verification_email.html",context);

        helper.setFrom("mkoszalka0@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Account Verification");
        helper.setText(htmlContext,true);
        javaMailSender.send(message);
    }

    @Override
    @Async
    public void sendResetPasswordEmail(User user,String siteUrl) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);

        String token = siteUrl + "/api/auth/reset-password?token=" + user.getResetPasswordToken();

        Context context = new Context();

        context.setVariable("token",token);

        String htmlContext = templateEngine.process("email/forgot_password.html",context);

        helper.setFrom("mkoszalka0@gmail.com");
        helper.setTo(user.getEmail());
        helper.setSubject("Password Reset");
        helper.setText(htmlContext,true);
        javaMailSender.send(message);
    }


}
