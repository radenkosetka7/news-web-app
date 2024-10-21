package com.example.news_api.models.requests;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AuthRequest {

    @NotNull(message = "Refresh token cannot be blank")
    private String refreshToken;
}
