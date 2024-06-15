package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Course.Course;
import com.c5r.schoolapp_api.Course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/course")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping("/add")
    public ResponseEntity<Course> courseStudent(@RequestBody Course course) {
        System.out.println("COURSE: " + course.getCourseName());
        System.out.println("COURSE: " + course.getSubject());
        System.out.println("COURSE: " + course.getStudentId());
        return ResponseEntity.ok(courseService.save(course));
    }
}
