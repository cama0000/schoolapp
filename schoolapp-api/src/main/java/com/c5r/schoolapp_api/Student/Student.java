package com.c5r.schoolapp_api.Student;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(
        name = Student.TABLE_NAME
)
public class Student implements UserDetails {

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

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // for too many failed login attempts
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // for password expiry
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
