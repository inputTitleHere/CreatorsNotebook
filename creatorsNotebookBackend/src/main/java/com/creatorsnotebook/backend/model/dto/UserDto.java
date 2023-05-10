package com.creatorsnotebook.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
  private long no;
  private String email;
  private String password;
  private String nickname;
  private LocalDateTime joinDate;
  private String privilege;
}
