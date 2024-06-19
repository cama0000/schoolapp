package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Course.Course;
import com.c5r.schoolapp_api.Course.CourseService;
import com.c5r.schoolapp_api.Student.Student;
import com.c5r.schoolapp_api.Task.Task;
import com.c5r.schoolapp_api.Task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;
import java.util.Optional;
import java.util.Set;

import static org.hibernate.internal.util.collections.ArrayHelper.forEach;

@RestController
@RequestMapping("/course")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @Autowired
    private TaskService taskService;

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

    @GetMapping("/getCourse/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable("id") Long id) {
        Optional<Course> course = courseService.findById(id);

        return course.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getTasksByCourse/{id}")
    public ResponseEntity<Set<Task>> getTasksByCourse(@PathVariable("id") long id, @RequestHeader("timezone") String timeZone) {
        Set<Task> tasks = taskService.findTasksByCourseId(id);

        ZoneId timeZoneId = ZoneId.of(timeZone);
        tasks.forEach(task -> {
            if(task.getDeadline() != null){
                task.setDeadline(task.getDeadline().atZone(ZoneId.of("UTC")).withZoneSameInstant(timeZoneId).toLocalDateTime());
            }
        });

        return ResponseEntity.ok(tasks);
    }
}
