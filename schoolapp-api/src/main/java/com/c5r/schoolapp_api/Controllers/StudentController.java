package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Student.Student;
import com.c5r.schoolapp_api.Student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
//@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/add")
    public ResponseEntity<Student> addStudent(@RequestBody Student student) {
        return ResponseEntity.ok(studentService.save(student));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteStudent(@PathVariable("id") long id) {
        studentService.delete(studentService.findById(id));
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.findAll());
    }
}
