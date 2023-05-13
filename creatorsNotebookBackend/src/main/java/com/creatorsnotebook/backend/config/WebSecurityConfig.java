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

@Configuration
@EnableWebSecurity
public class WebSecurityConfig{
  @Autowired
  JwtAuthenticationFilter jwtAuthenticationFilter;



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
   * 시큐리티를 적용하지 않을 위치들을 명시한다.
   * @return
   */
  @Bean
  public WebSecurityCustomizer webSecurityCustomizer(){
    return (web)->web.ignoring().requestMatchers("/images/**");
  }

  /**
   * Cors에 대한 설정을 수행한다.
   * React 기본 주소인 localhost:3000에 대해 모든 api를 허용한다.
   * @return
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
   * 내부적으로 random salt를 생성한다.
   *
   * @return Bcrypt 암호화 생성 객체
   */
  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
