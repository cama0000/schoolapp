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

        if (task.isPresent()) {
            taskService.delete(task.get());
        } else {
            ResponseEntity.notFound().build();
        }
    }

    @RequestMapping(
        value = "/markCompleted",
        method = RequestMethod.PUT,
        consumes = "application/json",
        produces = "application/json"
    )
    public ResponseEntity<Task> markCompleted(@RequestBody Task task) {
        Optional<Task> actualTask = taskService.findById(Long.valueOf(task.getId()));

        if(actualTask.isPresent()) {
            taskService.markCompleted(Long.valueOf(actualTask.get().getId()));

            return ResponseEntity.ok(taskService.findById(Long.valueOf(actualTask.get().getId())).get());
        }

        return ResponseEntity.notFound().build();
    }
}
