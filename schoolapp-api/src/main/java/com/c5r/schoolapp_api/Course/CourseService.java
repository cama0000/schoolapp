package com.c5r.schoolapp_api.Course;

import com.c5r.schoolapp_api.Student.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    public Set<Course> findCoursesByStudentId(Long id){
        return courseRepository.findStudentCoursesByStudentId(id);
    }

    public Course save(Course course){ return courseRepository.save(course);}

    public Optional<Course> findById(Long id){return courseRepository.findById(id);}

    public void delete(Course course){ courseRepository.delete(course);}

    public void deleteByStudentId(int studentId){ courseRepository.deleteByStudentId(studentId);}

}
