package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Config.AuthenticationRequest;
import com.c5r.schoolapp_api.Config.AuthenticationResponse;
import com.c5r.schoolapp_api.Config.AuthenticationService;
import com.c5r.schoolapp_api.Config.RegisterRequest;
import com.c5r.schoolapp_api.Student.Student;
import com.c5r.schoolapp_api.Student.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authorization")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthorizationController {
    private final AuthenticationService authenticationService;

    @Autowired
    StudentService studentService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
        AuthenticationResponse response = authenticationService.authenticate(request);

        System.out.println("RESPONSE: " + response);
        System.out.println("TOKEN: " + response.getToken());

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, response.getToken())
                .body(response);

//        return ResponseEntity.ok()
//                .header(HttpHeaders.AUTHORIZATION, "Bearer " + response.getToken()) // Ensure "Bearer " prefix
//                .body(response);
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

}
