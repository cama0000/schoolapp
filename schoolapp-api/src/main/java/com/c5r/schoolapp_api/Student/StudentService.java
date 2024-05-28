package com.c5r.schoolapp_api.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    public Student save(Student student){ return studentRepository.save(student);}
    public void delete(Student student){ studentRepository.delete(student);};
    public List<Student> findAll(){ return studentRepository.findAll();}
    public Student findById(long id){ return studentRepository.findById(id);}
}
