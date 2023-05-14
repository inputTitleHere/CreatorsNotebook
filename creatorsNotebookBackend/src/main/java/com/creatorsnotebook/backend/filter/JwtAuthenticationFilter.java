package com.creatorsnotebook.backend.filter;

import com.creatorsnotebook.backend.model.dto.UserDto;
import com.creatorsnotebook.backend.utils.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * 매 요청시 JWT을 파싱 및 추출하여 요청에 대한 권한을 확인한다.
 */
@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  JwtProvider jwtProvider;

  /**
   * 요청의 Header에서 Authentication에 보관된 JWT를 꺼내어 권한처리를 수행한다.
   * JWT가 없으면 이 과정은 무시된다.
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    try {
      String token = parseBearerToken(request);
      log.info("User JWT : {}",token);
      if (token != null && !token.equalsIgnoreCase("null")) {
        UserDto user = jwtProvider.validateAndGetUser(token);
        AbstractAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getNo(),
                        null,
                        AuthorityUtils.createAuthorityList(user.getPrivilege())
                );
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);
        log.info("Passed JWT filter. userNo = {}",user.getNo());
      }
    } catch (Exception e) {
      log.error("Failed to set user authentication in security context",e);
    }
    filterChain.doFilter(request,response);
  }


  /**
   * request의 Header에서 JWT를 추출한다.
   * @param request 사용자(프런트)로 부터 받은 요청
   * @return Authorization에 대한 Header가 있으면 JWt를 추출해서 반환한다.
   */
  private String parseBearerToken(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }

}
