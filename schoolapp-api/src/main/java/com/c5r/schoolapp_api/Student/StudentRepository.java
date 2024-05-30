package com.c5r.schoolapp_api.Student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query(value = "SELECT * FROM students WHERE id = ?1", nativeQuery = true)
    public Student findById(long id);

    @Query(value = "SELECT * FROM students WHERE username = ?1", nativeQuery = true)
    public Optional<Student> findByUsername(String username);

    @Query(value = "SELECT * FROM students WHERE email = ?1", nativeQuery = true)
    public Optional<Student> findByEmail(String email);
}
