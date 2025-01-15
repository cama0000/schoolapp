package com.c5r.schoolapp_api.Page;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {
    @Query(value = "SELECT * FROM pages p WHERE p.COURSE_ID = ?1", nativeQuery = true)
    public Set<Page> findByCourseId(Long id);

    @Query(value = "SELECT * FROM pages p WHERE p.STUDENT_ID = ?1", nativeQuery = true)
    public Set<Page> findByStudentId(Long id);

    @Query(value = "SELECT * FROM pages p WHERE p.student_id = ?1 AND p.title LIKE %?2%", nativeQuery = true)
    public Set<Page> findBySearch(Long id, String search);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM pages p WHERE p.student_id = ?1", nativeQuery = true)
    public void deleteByStudentId(int studentId);

}
