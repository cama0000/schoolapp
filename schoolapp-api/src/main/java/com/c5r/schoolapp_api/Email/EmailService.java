package com.c5r.schoolapp_api.Email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String to, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Prism - Password Reset Request");
        message.setText("You have recently requested a password reset for Prism. \nYou can reset your password using this link: " + resetLink);
        mailSender.send(message);
    }
}
