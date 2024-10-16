package com.example.news_api.services.impl;

import com.example.news_api.models.responses.AuthenticationResponse;
import com.example.news_api.services.IAuthService;
import com.example.news_api.services.ITokenService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService implements IAuthService {

    private final ITokenService tokenService;

    @Override
    public AuthenticationResponse authenticate() {
        return AuthenticationResponse.builder()
                .accessToken(tokenService.generateToken())
                .refreshToken(tokenService.generateRefreshToken())
                .build();
    }

    @Override
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader("Authorization");
        final String refreshToken;
        final String user;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        user = tokenService.extractSubject(refreshToken);
        if(user != null)
        {
            if(tokenService.isTokenValid(refreshToken))
            {
                AuthenticationResponse authResponse = AuthenticationResponse.builder()
                        .accessToken(tokenService.generateToken())
                        .refreshToken(refreshToken)
                        .build();
                response.setContentType("application/json");
                new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
            }
        }

    }

}
