package com.c5r.schoolapp_api.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    public Student save(Student student){ return studentRepository.save(student);}
    public void delete(Student student){ studentRepository.delete(student);};
    public List<Student> findAll(){ return studentRepository.findAll();}
    public Student findById(long id){ return studentRepository.findById(id);}
    public Optional<Student> findByUsername(String username){ return studentRepository.findByUsername(username);}
    public Optional<Student> findByEmail(String email){ return studentRepository.findByEmail(email);}

}
