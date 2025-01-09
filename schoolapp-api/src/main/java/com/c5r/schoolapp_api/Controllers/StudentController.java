package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Course.Course;
import com.c5r.schoolapp_api.Course.CourseRepository;
import com.c5r.schoolapp_api.Student.Student;
import com.c5r.schoolapp_api.Student.StudentService;
import com.c5r.schoolapp_api.Task.Task;
import com.c5r.schoolapp_api.Task.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private TaskRepository taskRepository;

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

    @GetMapping("/getStudentFromUsername/{username}")
    public ResponseEntity<Student> getStudentFromUsername(@PathVariable("username") String username) {
        Optional<Student> student = studentService.findByUsername(username);

        return student.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/getStudentCourses/{id}")
    public ResponseEntity<Set<Course>> getStudentCourses(@PathVariable("id") long id) {
        return ResponseEntity.ok(courseRepository.findStudentCoursesByStudentId(id));
    }

    @GetMapping("/getStudentTasks/{id}")
    public ResponseEntity<Set<Task>> getStudentTasks(@PathVariable("id") long id, @RequestHeader("timezone") String timeZone) {
        Set<Task> tasks = taskRepository.findTasksByStudentId(id);

        ZoneId timeZoneId = ZoneId.of(timeZone);
        tasks.forEach(task -> {
            if(task.getDeadline() != null){
                task.setDeadline(task.getDeadline().atZone(ZoneId.of("UTC")).withZoneSameInstant(timeZoneId).toLocalDateTime());
            }
        });
        return ResponseEntity.ok(tasks);
    }
}
