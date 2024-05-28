package com.c5r.schoolapp_api.Student;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
        name = Student.TABLE_NAME
)
public class Student {

    public static final String TABLE_NAME = "STUDENTS";

    @Id
    @SequenceGenerator(
            name = "student_id_seq",
            sequenceName = "student_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "student_id_seq"
    )
    private Integer id;

    @Column(
            name = "FIRST_NAME",
            nullable = false
    )
    private String firstName;

    @Column(
            name = "LAST_NAME",
            nullable = false
    )
    private String lastName;

    @Column(
            name = "LEVEL",
            nullable = false
    )
    private String level;

    @Column(
            name = "EMAIL",
            nullable = false
    )
    private String email;

    @Column(
            name = "USERNAME",
            nullable = false
    )
    private String username;

    @Column(
            name = "PASSWORD",
            nullable = false
    )
    private String password;

    @Column(
            name = "PROFILE_IMAGE_URL",
            unique = true
    )
    private String profileImageUrl;
}
