package com.c5r.schoolapp_api.Config;

import com.c5r.schoolapp_api.Student.Role;
import com.c5r.schoolapp_api.Student.Student;
import com.c5r.schoolapp_api.Student.StudentRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Data
public class AuthenticationService {
    private final StudentRepository studentRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request){

        Student student = new Student();

        // create student object and save to database
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setEmail(request.getEmail());
        student.setUsername(request.getUsername());
        student.setPassword(passwordEncoder.encode(request.getPassword()));
        student.setRole(Role.USER);
        student.setProfileImageUrl(null);

        studentRepository.save(student);

        // return token
        var jwtToken = jwtService.generateToken(student);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){

        // for securityContextHolder
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            throw new BadCredentialsException("Invalid username or password");
        }

        var student = studentRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Student not found"));

        System.out.println("STUDENT NAME: "  + student.getFirstName() + " " + student.getLastName());

        // return token
        var jwtToken = jwtService.generateToken(student);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }



}
