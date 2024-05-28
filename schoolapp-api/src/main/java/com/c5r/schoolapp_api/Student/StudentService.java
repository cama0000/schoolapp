package com.c5r.schoolapp_api.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    public Student saveStudent(Student student){ return studentRepository.save(student);}
    public void removeStudent(Student student){ studentRepository.delete(student);};
    public List<Student> getAllStudents(){ return studentRepository.findAll();}
}
