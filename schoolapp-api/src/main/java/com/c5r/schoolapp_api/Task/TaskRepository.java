package com.c5r.schoolapp_api.Task;

import com.c5r.schoolapp_api.Course.Course;
import com.c5r.schoolapp_api.Student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query(value = "SELECT * FROM tasks t WHERE t.course_id = ?1", nativeQuery = true)
    public Set<Task> findTasksByCourseId(Long id);

    @Query(value = "SELECT * FROM tasks t WHERE t.student_id = ?1", nativeQuery = true)
    public Set<Task> findTasksByStudentId(Long id);

}
