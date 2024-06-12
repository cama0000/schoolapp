package com.c5r.schoolapp_api.Course;

import com.c5r.schoolapp_api.Student.Student;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Set;

@Data
@Entity
@Table(
        name = Course.TABLE_NAME
)
public class Course {
    public static final String TABLE_NAME = "COURSES";

    @Id
    @SequenceGenerator(
            name = "course_id_seq",
            sequenceName = "course_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "course_id_seq"
    )
    private Integer id;

    @Column(
            name = "COURSE_NAME",
            nullable = false
    )
    private String courseName;

    @Column(
            name = "SUBJECT",
            nullable = false
    )
    private String subject;

//    @ManyToMany(cascade = CascadeType.ALL)
//    @JoinTable(
//            name = "students_courses",
//            joinColumns = @JoinColumn(name = "course_id"),
//            inverseJoinColumns = @JoinColumn(name = "username"))
//    private Set<Student> students;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;
}
