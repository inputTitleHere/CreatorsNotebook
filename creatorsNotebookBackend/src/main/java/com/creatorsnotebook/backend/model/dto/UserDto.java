package com.creatorsnotebook.backend.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;

@Getter
@Setter
public class UserDto {
  private String email;
  private String password;
  private String nickname;
  private LocalDateTime joinDate;
  private String privilege;
}
