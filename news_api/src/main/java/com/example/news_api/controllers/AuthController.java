package com.example.news_api.controllers;

import com.example.news_api.models.responses.AuthenticationResponse;
import com.example.news_api.services.IAuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final IAuthService authService;

    @GetMapping("/token")
    public AuthenticationResponse authenticate()
    {
        return authService.authenticate();
    }

    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException
    {
        authService.refreshToken(request, response);
    }
}
