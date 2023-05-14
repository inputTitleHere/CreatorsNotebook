package com.creatorsnotebook.backend.utils;

import com.creatorsnotebook.backend.model.dto.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

/**
 * Json Web Token(JWT)관련 클래스
 */
@Component
public class JwtProvider {

    private String secretKey;
    private SecretKey key;
    private final long EXPIRATION_TIME = 7 * 24 * 60 * 60 * 1000;

    public JwtProvider(@Value("${jwt.secret}") String secretKey) {
        this.secretKey = secretKey;
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String createJwt(UserDto userDto) {
        Date now = new Date();
        userDto.setPassword(" ");
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME);
        return Jwts.builder()
                .setSubject(Long.toString(userDto.getNo()))
                .setIssuer("CreatorsNotebook")
                .setIssuedAt(now)
                .claim("auth", userDto.getPrivilege())
                .claim("email", userDto.getEmail())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public String resolveToken(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder().setSigningKey(secretKey).build()
                .parseClaimsJws(token).getBody();
        Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get("auth").toString()
                .split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
        User principal = new User(claims.getSubject(), "",authorities);
        return new UsernamePasswordAuthenticationToken(principal,token,authorities);
    }


    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> parsed = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(jwtToken);
            return !parsed.getBody().getExpiration().before(new Date());
        } catch (Exception e) {
            return false;
        }
    }


}
