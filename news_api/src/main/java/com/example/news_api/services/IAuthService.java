package com.example.news_api.services;

import com.example.news_api.models.requests.AuthRequest;
import com.example.news_api.models.responses.AuthenticationResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface IAuthService {

    AuthenticationResponse authenticate();

    AuthenticationResponse refreshToken(AuthRequest request) throws IOException;
}
