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

@Slf4j
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  @Autowired
  JwtProvider jwtProvider;

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


  private String parseBearerToken(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
      return bearerToken.substring(7);
    }
    return null;
  }

}
