package com.creatorsnotebook.backend.model.dto;

import com.creatorsnotebook.backend.model.entity.UserEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class UserDto {
  private long no;
  private String email;
  private String password;
  private String nickname;
  private LocalDateTime joinDate;
  private String privilege;

  public UserDto(UserEntity entity) {
    this.no = entity.getNo();
    this.email = entity.getEmail();
    this.password = entity.getPassword();
    this.nickname = entity.getNickname();
    this.joinDate = entity.getJoinDate();
    this.privilege = entity.getPrivilege();
  }
}
