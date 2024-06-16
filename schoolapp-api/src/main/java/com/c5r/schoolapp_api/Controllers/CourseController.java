package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Course.Course;
import com.c5r.schoolapp_api.Course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/course")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @PostMapping("/add")
    public ResponseEntity<Course> addCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseService.save(course));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCourse(@PathVariable("id") long id) {
        Optional<Course> course = courseService.findById(id);

        if(course.isPresent()) {
            courseService.delete(course.get());
        }
        else{
            ResponseEntity.notFound().build();
        }
    }
}
