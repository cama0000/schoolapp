package com.c5r.schoolapp_api.Task;

import com.c5r.schoolapp_api.Course.Course;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class TaskService {

    @Autowired
    TaskRepository taskRepository;

    public Set<Task> findTasksByCourseId(Long id){
        return taskRepository.findTasksByCourseId(id);
    }

    public Task save(Task task){ return taskRepository.save(task);}

    public Set<Task> findTasksByStudent(Long id){ return taskRepository.findTasksByStudentId(id);}
}
