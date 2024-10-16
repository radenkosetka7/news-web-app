package com.example.news_api.services;

import io.jsonwebtoken.Claims;

import java.util.function.Function;

public interface ITokenService {

    String extractSubject(String token);

    <T> T extractClaim(String token, Function<Claims, T> claimsResolver);

    String buildToken(String expirationTime);

    String generateToken();

    String generateRefreshToken();

    boolean isTokenValid(String token);

}
