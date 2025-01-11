package com.c5r.schoolapp_api.Config;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResetPasswordRequest {
    private String token;
    private String newPassword;
}
