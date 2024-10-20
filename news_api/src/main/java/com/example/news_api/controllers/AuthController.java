package com.example.news_api.controllers;

import com.example.news_api.models.requests.AuthRequest;
import com.example.news_api.models.responses.AuthenticationResponse;
import com.example.news_api.services.IAuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;

    @GetMapping("/token")
    public AuthenticationResponse authenticate() {
        return authService.authenticate();
    }

    @PostMapping("/token/refresh")
    public AuthenticationResponse refreshToken(@RequestBody @Valid AuthRequest request) throws IOException {
        return authService.refreshToken(request);
    }
}
