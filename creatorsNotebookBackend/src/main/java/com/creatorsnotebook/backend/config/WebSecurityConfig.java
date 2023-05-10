package com.creatorsnotebook.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig implements WebMvcConfigurer {
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeHttpRequests((authorize) ->
                    authorize.requestMatchers("/user/**").permitAll()
            )
            .csrf().disable()
    ;
    return http.build();
  }

  /**
   * Adds Cors mappings
   * addMapping -> 서버의 API에 대한 매핑.
   * allowedOrigins -> 서버로 요청을 보내는 주소. ex) http://localhost:3000 -> react
   * allowedMethods -> CORS를 해제할 요청 방식.
   *
   * @param registry default autowired
   */
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**").allowedOrigins("http://localhost:3000").allowedMethods("OPTIONS", "GET", "POST", "PUT", "DELETE");
  }

  /**
   * 내부적으로 random salt를 생성한다.
   *
   * @return Bcrypt 암호화 생성 객체
   */
  @Bean
  public PasswordEncoder encoder() {
    return new BCryptPasswordEncoder();
  }

}
