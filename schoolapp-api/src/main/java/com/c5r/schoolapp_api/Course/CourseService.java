package com.c5r.schoolapp_api.Course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CourseService {
    @Autowired
    CourseRepository courseRepository;

    public Set<Course> findCoursesByStudentId(Long id){
        return courseRepository.findStudentCoursesByStudentId(id);
    }

}
