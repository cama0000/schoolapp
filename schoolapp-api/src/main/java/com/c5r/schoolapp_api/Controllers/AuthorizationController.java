package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Config.*;
import com.c5r.schoolapp_api.Email.EmailService;
import com.c5r.schoolapp_api.PasswordResetToken.PasswordResetToken;
import com.c5r.schoolapp_api.PasswordResetToken.TokenService;
import com.c5r.schoolapp_api.Student.Student;
import com.c5r.schoolapp_api.Student.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/authorization")
@RequiredArgsConstructor
public class AuthorizationController {
    private final AuthenticationService authenticationService;

    @Autowired
    StudentService studentService;
    @Autowired
    TokenService tokenService;
    @Autowired
    EmailService emailService;

    private final PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        AuthenticationResponse response = authenticationService.authenticate(request);

//        System.out.println("RESPONSE: " + response);
//        System.out.println("TOKEN: " + response.getToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.getToken())
                .body(response);
    }

    @RequestMapping(
            value = "/check-username/{username}",
            method = RequestMethod.GET
    )
    public ResponseEntity<String> checkUsername(@PathVariable String username){
        if(studentService.findByUsername(username).isEmpty()){
            return ResponseEntity.ok(username);
        }
        else{
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(
            value = "/check-email/{email}",
            method = RequestMethod.GET
    )
    public ResponseEntity<String> checkEmail(@PathVariable String email){
        if(studentService.findByEmail(email).isEmpty()){
            return ResponseEntity.ok(email);
        }
        else{
            return ResponseEntity.badRequest().build();
        }
    }

    // sends password reset email and generates token
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> email) {

        System.out.println("FORGOT PASSWORD EMAIL: " + email);

        String decodedEmail = URLDecoder.decode(email.get("email"), StandardCharsets.UTF_8);

        System.out.println("FORGOT PASSWORD: " + decodedEmail);
        // check if email actually is used on the platform
        if(studentService.findByEmail(decodedEmail).isEmpty()){
            return ResponseEntity.badRequest().build();
        }

//        System.out.println("Creating token");

        String token = UUID.randomUUID().toString();

//        System.out.println("Token: " + token);

        PasswordResetToken resetToken = new PasswordResetToken(token, decodedEmail, LocalDateTime.now(), LocalDateTime.now().plusHours(1));
        tokenService.save(resetToken);

//        System.out.println("Token saved");

        String resetLink = "http://schoolapp-zeta.vercel.app/password-reset" + "?token=" + token;
//        String resetLink = "http://localhost:3000/password-reset" + "?token=" + token;

        emailService.sendPasswordResetEmail(decodedEmail, resetLink);

//        System.out.println("Email sent");


        return ResponseEntity.ok("Password reset link sent.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        String tokenString = request.getToken();
        String newPassword = request.getNewPassword();

//        System.out.println("TOKEN: " + tokenString);
//        System.out.println("NEW PASSWORD: " + newPassword);

        // do all checks to see if token is valid
        Optional<PasswordResetToken> tokenOptional = tokenService.findByToken(tokenString);

        if(tokenOptional.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        PasswordResetToken token = tokenOptional.get();

//        System.out.println("FOUND TOKEN");

        if(token.getExpiresAt().isBefore(LocalDateTime.now())){
            return ResponseEntity.badRequest().build();
        }

        if(token.isUsed()){
            return ResponseEntity.badRequest().build();
        }

//        System.out.println("TOKEN IS VALID");


        // retrieve the student

        String email = token.getEmail();

//        System.out.println("STUDENT EMAIL: " + email);

        Optional<Student> studentOptional = studentService.findByEmail(email);

        if(studentOptional.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Student student = studentOptional.get();

//        System.out.println("FOUND STUDENT");


        // change the password and save them to db

        String encryptedPassword = passwordEncoder.encode(newPassword);

//        System.out.println("ENCRYPTED PASSWORD: " + encryptedPassword);

        student.setPassword(encryptedPassword);
        studentService.save(student);

        // save updated token

        token.setUsed(true);
        tokenService.save(token);

        return ResponseEntity.ok("Password has successfully been reset");
    }



}