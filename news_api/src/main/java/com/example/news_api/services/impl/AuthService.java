package com.example.news_api.services.impl;

import com.example.news_api.models.requests.AuthRequest;
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
    public AuthenticationResponse refreshToken(AuthRequest request) throws IOException {
        String token = request.getRefreshToken();

            if(tokenService.isTokenValid(token)) {
                return AuthenticationResponse.builder()
                        .accessToken(tokenService.generateToken())
                        .refreshToken(token)
                        .build();
            }
        return null;
    }

}
