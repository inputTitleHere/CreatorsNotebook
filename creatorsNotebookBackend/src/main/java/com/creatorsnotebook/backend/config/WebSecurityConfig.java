package com.creatorsnotebook.backend.config;

import com.creatorsnotebook.backend.filter.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;
import java.util.List;


/**
 * Spring Security 및 CORS에 관한 설정을 명시한 Configuration 파일
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig{
  @Autowired
  JwtAuthenticationFilter jwtAuthenticationFilter;


  /**
   * Spring Security에 대한 전반적인 설정을 명시한다.
   * 특정 API에 대한 접근 권한(특정 권한 필요, 또는 익명, 인증 여부에 따른 접근 등)설정
   * <ul>
   *   <li>specific한 경로가 위로, board한 경로는 아래로</li>
   *   <li>hasAuthority는 JWT 발급시 배치한 "auth"에 의거하여 판단한다 -> JWTfilter에서 파싱.</li>
   * </ul>
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
                            .requestMatchers("/user/mypage").authenticated()
                            .requestMatchers("/user/**").anonymous()
                            .requestMatchers("/dashboard/**").hasAuthority("FT")
                            .requestMatchers("/project").permitAll()
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
   * 시큐리티를 적용하지 않을 경로들을 명시한다.
   * @return WebSecurityCustomizer 객체.
   */
  @Bean
  public WebSecurityCustomizer webSecurityCustomizer(){
    return (web)->web.ignoring().requestMatchers("/images/**");
  }

  /**
   * Cors에 대한 설정을 수행한다.
   * React 기본 주소인 localhost:3000에 대해 모든 api를 허용한다.
   * @return CORS설정이 적용된 CorsConfigurationSource객체.
   */
  @Bean
  CorsConfigurationSource corsConfigurationSource(){
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(List.of("http://localhost:3000"));
    config.addAllowedHeader("*");
    config.addAllowedMethod("*");
    config.setAllowCredentials(true);
    config.setMaxAge(3600L);

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**",config);
    return source;
  }

  /**
   * 비밀번호를 BCrypt방식으로 암호화하기 위한 PasswordEncoder객체를 생성한다.
   * @return Bcrypt 암호화 생성 객체
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}