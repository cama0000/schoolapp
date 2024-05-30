package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/authorization")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthorizationController {
    @Autowired
    StudentService studentService;

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
