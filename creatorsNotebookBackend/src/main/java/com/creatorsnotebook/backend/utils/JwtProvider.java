package com.creatorsnotebook.backend.utils;

import com.creatorsnotebook.backend.model.dto.UserDto;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
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
 * Json Web Token(JWT) 생성 및 파싱
 */
@Component
public class JwtProvider {

  //    private final String secretKey;
  private final SecretKey key;
  private final long EXPIRATION_TIME = 604800000; // 7 * 24 * 60 * 60 * 1000

  /**
   * JWT암호화에 사용할 KEY를 생성한다.
   * @param secretKey 외부에서 주입받는 JWT비밀키.
   */
  public JwtProvider(@Value("${jwt.secret}") String secretKey) {
//        this.secretKey = secretKey;
    this.key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
  }

  /**
   * JWT을 생성하여 반환한다.
   * 사용자 고유번호, 권한이 저장된다.
   * 만료시간은 1주일로 설정하였다.
   * @param userDto JWT에 저장할 유저 정보가 담긴 UserDto객체
   * @return 신규발급된 JWT 문자열
   */
  public String createJwt(UserDto userDto) {
    Date now = new Date();
    userDto.setPassword(" ");
    Date expiration = new Date(now.getTime() + EXPIRATION_TIME);
    return Jwts.builder()
            .setSubject(Long.toString(userDto.getNo()))
            .setIssuer("CreatorsNotebook")
            .setIssuedAt(now)
            .claim("auth", userDto.getPrivilege())
            .setExpiration(expiration)
            .signWith(key)
            .compact();
  }


  /**
   * JWT을 파싱하여 사용자 번호와 권한을 추출한다.
   *
   * @param token JWT토큰을 입력받는다.(JWS형식이다.)
   * @return 사용자 번호, 사용자 권한이 담긴 UserDto객체를 반환한다.
   */
  public UserDto validateAndGetUser(String token) {
    Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    return UserDto.builder()
            .no(Long.parseLong(claims.getSubject()))
            .privilege((String) claims.get("auth"))
            .build();
  }


}
