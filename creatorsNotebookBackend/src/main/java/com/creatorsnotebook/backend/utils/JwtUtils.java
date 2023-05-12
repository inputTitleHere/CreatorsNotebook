package com.creatorsnotebook.backend.utils;

import com.creatorsnotebook.backend.model.dto.UserDto;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

/**
 * Json Web Token(JWT)관련 유틸리티 클래스
 */
@Component
@RequiredArgsConstructor
public class JWTUtils {

  @Value(value = "${jwt.secret.key}")
  private final String jwtSecretKey;
  private final SecretKey key = Keys.hmacShaKeyFor(jwtSecretKey.getBytes(StandardCharsets.UTF_8));
  private final long EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

  private String createJwt(UserDto userDto) {
    Date now = new Date();
    Date expiration = new Date(now.getTime()+EXPIRATION_TIME);
    return Jwts.builder()
            .setSubject(userDto.getEmail())
            .setIssuer("CreatorsNotebook")
            .setIssuedAt(now)
            .claim("auth",userDto.getPrivilege())
            .setExpiration(expiration)
            .signWith(key)
            .compact();
  }


}
