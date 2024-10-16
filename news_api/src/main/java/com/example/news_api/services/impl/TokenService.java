package com.example.news_api.services.impl;

import com.example.news_api.exceptions.UnauthorizedException;
import com.example.news_api.services.ITokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.UUID;
import java.util.function.Function;

@Service
public class TokenService implements ITokenService {

    @Value("${authorization.token.secret}")
    private String secretKey;

    @Value("${authorization.access-token.expiration-time}")
    private String accessTokenExpirationTime;

    @Value("${authorization.refresh-token.expiration-time}")
    private String refreshTokenExpirationTime;


    @Override
    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractClaims(String token) {
        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        }
        catch (Exception e) {
            throw new UnauthorizedException("Token is invalid or expired");
        }
    }

    @Override
    public String buildToken(String expirationTime) {
        return Jwts
                .builder()
                .setSubject(UUID.randomUUID().toString())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + Long.parseLong(expirationTime)))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    @Override
    public String generateToken() {
        return buildToken(accessTokenExpirationTime);

    }

    @Override
    public String generateRefreshToken() {
        return buildToken(refreshTokenExpirationTime);
    }

    @Override
    public boolean isTokenValid(String token) {
        extractClaims(token);
        return !isTokenExpired(token);
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Date extractExiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    private boolean isTokenExpired(String token) {
        return extractExiration(token).before(new Date());
    }
}
