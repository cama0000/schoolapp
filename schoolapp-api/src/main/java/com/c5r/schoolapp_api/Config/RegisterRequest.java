package com.c5r.schoolapp_api.Config;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String username;
    private String password;

    public String getFirstName() {
        return firstName;  // Return the username field value
    }
}
