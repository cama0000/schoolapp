package com.c5r.schoolapp_api.Page;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(
        name = Page.TABLE_NAME
)
public class Page {
    public static final String TABLE_NAME = "PAGES";

    @Id
    @SequenceGenerator(
            name = "page_id_seq",
            sequenceName = "page_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "page_id_seq"
    )
    private Integer id;

    @Column(
            name = "TITLE",
            nullable = false
    )
    private String title;

    @Column(
            name = "CONTENT",
            nullable = false,
            length = 10485760
    )
    private String content;

    @Column(
            name = "COURSE_ID",
            nullable = false
    )
    private Integer courseId;

    @CreationTimestamp
    @Column(name = "TIME_CREATED", updatable = false)
    private LocalDateTime timeCreated;

    @UpdateTimestamp
    @Column(name = "TIME UPDATED")
    private LocalDateTime timeUpdated;

    // soft delete mechanism maybe for later
//    @Column(name = "DELETED", nullable = false)
//    private boolean deleted = false;
}
