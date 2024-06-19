package com.c5r.schoolapp_api.Controllers;

import com.c5r.schoolapp_api.Course.Course;
import com.c5r.schoolapp_api.Task.Task;
import com.c5r.schoolapp_api.Task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        return ResponseEntity.ok(taskService.save(task));
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable("id") long id) {
        Optional<Task> task = taskService.findById(id);

        if(task.isPresent()) {
            taskService.delete(task.get());
        }
        else{
            ResponseEntity.notFound().build();
        }
    }
}
