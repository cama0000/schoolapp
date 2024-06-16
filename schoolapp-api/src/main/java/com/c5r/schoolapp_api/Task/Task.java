package com.c5r.schoolapp_api.Task;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
@Entity
@Table(
        name = Task.TABLE_NAME
)
public class Task {
    public static final String TABLE_NAME = "TASKS";

    @Id
    @SequenceGenerator(
            name = "task_id_seq",
            sequenceName = "task_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "task_id_seq"
    )
    private Integer id;

    @Column(
            name = "TASK_NAME",
            nullable = false
    )
    private String taskName;

    @Column(name = "DEADLINE")
    private LocalDateTime deadline;

    @Column(
            name = "COURSE_ID",
            nullable = false
    )
    private Integer courseId;

    @Column(
            name = "STUDENT_ID",
            nullable = false
    )
    private Integer studentId;
}
