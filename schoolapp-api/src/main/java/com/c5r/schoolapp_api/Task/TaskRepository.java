package com.c5r.schoolapp_api.Task;

import com.c5r.schoolapp_api.Student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Student, Long> {
}
