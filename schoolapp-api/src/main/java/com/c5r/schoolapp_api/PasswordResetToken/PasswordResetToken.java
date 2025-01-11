package com.c5r.schoolapp_api.PasswordResetToken;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = PasswordResetToken.TABLE_NAME)
public class PasswordResetToken {

    public static final String TABLE_NAME = "PASSWORD_RESET_TOKENS";

    @Id
    @SequenceGenerator(
            name = "password_reset_id_seq",
            sequenceName = "password_reset_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "password_reset_id_seq"
    )
    private Long id;

    @Column(name = "TOKEN", nullable = false, unique = true)
    private String token;

    @Column(name = "EMAIL", nullable = false)
    private String email;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "EXPIRES_AT", nullable = false)
    private LocalDateTime expiresAt;

    @Column(name = "USED", nullable = false)
    private boolean used = false;

    public PasswordResetToken(String token, String email, LocalDateTime createdAt, LocalDateTime expiresAt) {
        this.token = token;
        this.email = email;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }

    public void markAsUsed() {
        this.used = true;
    }
}
