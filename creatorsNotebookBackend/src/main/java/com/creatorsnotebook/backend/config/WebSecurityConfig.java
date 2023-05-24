package com.creatorsnotebook.backend.config;

import com.creatorsnotebook.backend.filter.JwtAuthenticationFilter;
import jakarta.servlet.MultipartConfigElement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.util.unit.DataSize;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;


/**
 * Spring Security 및 CORS에 관한 설정을 명시한 Configuration 파일
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
  @Autowired
  JwtAuthenticationFilter jwtAuthenticationFilter;


  /**
   * Spring Security에 대한 전반적인 설정을 명시한다.
   * 특정 API에 대한 접근 권한(특정 권한 필요, 또는 익명, 인증 여부에 따른 접근 등)설정
   * <ul>
   *   <li>specific한 경로가 위로, board한 경로는 아래로</li>
   *   <li>hasAuthority는 JWT 발급시 배치한 "auth"에 의거하여 판단한다 -> JWTfilter에서 파싱.</li>
   * </ul>
   *
   * @param http : HttpSecurity 객체.
   * @return 빌드된 SecurityFilterChain
   * @throws Exception 생성 오류 발생시
   */
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .formLogin().disable()
            .httpBasic().disable()
            .authorizeHttpRequests((authorize) ->
                    authorize
                            .requestMatchers("/user/login","/user/register","/user/checkIfEmailUsable").anonymous()
                            .requestMatchers("/user/**").authenticated()
                            .requestMatchers("/dashboard/**").hasAuthority("FT")
                            .requestMatchers("/project/{projectUuid}").permitAll()
                            .requestMatchers("/project/**").authenticated()
                            .requestMatchers("/image/**").permitAll()
            )
            .csrf().disable()
            .cors().and()
            .addFilterAfter(
                    jwtAuthenticationFilter,
                    CorsFilter.class
            )
    ;

    return http.build();
  }

  /**
   * Cors에 대한 설정을 수행한다.
   * React 기본 주소인 localhost:3000에 대해 모든 api를 허용한다.
   *
   * @return CORS설정이 적용된 CorsConfigurationSource객체.
   */
  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:3000"));
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");
    config.setAllowCredentials(true);
    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
  }

  /**
   * 비밀번호를 BCrypt방식으로 암호화하기 위한 PasswordEncoder객체를 생성한다.
   *
   * @return Bcrypt 암호화 생성 객체
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  /**
   * @return multipart formdata형식으로 오는 이미지를 처리하기 위한 resolver를 Bean으로 등록
   */
  @Bean
  public MultipartResolver multipartResolver() {
    return new StandardServletMultipartResolver();
  }

  /**
   * Multipart을 통해 들어오는 파일에 대한 제약사항을 설정한다.
   * @return multipart제약사항이 포함된 객체를 Bean으로 등록
   */
  @Bean
  public MultipartConfigElement multipartConfigElement() {
    MultipartConfigFactory factory = new MultipartConfigFactory();
    factory.setMaxFileSize(DataSize.ofBytes(1024 * 1024 * 5)); // 5MB
    factory.setMaxRequestSize(DataSize.ofBytes(1024 * 1024 * 5));
    return factory.createMultipartConfig();
  }
}
