package com.c5r.schoolapp_api.Course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CourseRepository  extends JpaRepository<Course, Long> {
    @Query(value = "SELECT * FROM courses c WHERE c.student_id = ?1", nativeQuery = true)
    public Set<Course> findStudentCoursesByStudentId(Long id);
}
