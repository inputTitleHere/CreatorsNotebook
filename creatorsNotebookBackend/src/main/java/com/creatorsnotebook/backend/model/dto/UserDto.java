package com.creatorsnotebook.backend.model.dto;

import com.creatorsnotebook.backend.model.entity.UserEntity;
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

  public UserDto(UserEntity entity) {
    this.no= entity.getNo();
    this.email=entity.getEmail();
    this.password= entity.getPassword();
    this.nickname=entity.getNickname();
    this.joinDate=entity.getJoinDate();
    this.privilege=entity.getPrivilege();
  }
}
