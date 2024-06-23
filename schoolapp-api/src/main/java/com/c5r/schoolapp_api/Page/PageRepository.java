package com.c5r.schoolapp_api.Page;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PageRepository extends JpaRepository<Page, Long> {
    @Query(value = "SELECT * FROM pages p WHERE p.COURSE_ID = ?1", nativeQuery = true)
    public Set<Page> findByCourseId(Long id);
}
