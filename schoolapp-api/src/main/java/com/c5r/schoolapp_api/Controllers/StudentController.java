package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Student.Student;
import com.c5r.schoolapp_api.Student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/addStudent")
    public Student addStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @DeleteMapping("/deleteStudent")
    public void deleteStudent(@RequestBody Student student) {
        studentService.removeStudent(student);
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }
}
