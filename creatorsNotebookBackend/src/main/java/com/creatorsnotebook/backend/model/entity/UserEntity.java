package com.creatorsnotebook.backend.model.entity;

import com.creatorsnotebook.backend.model.dto.UserDto;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;

/**
 * User테이블에 접근하는 UserEntity.
 * <h3>fields</h3>
 * <ul>
 *   <li>email : PK</li>
 *   <li>password : notnull</li>
 *   <li>nickname : notnull</li>
 *   <li>joinDate : notnull, DEFAULT : CURRENT_TIMESTAMP</li>
 *   <li>privilege : notnull, DEFAULT : FT</li>
 * </ul>
 */
@Entity
@Table(name = "user")
@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {

  @Id
  @Column(name = "email")
  private String email;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "nickname", nullable = false)
  private String nickname;

  @Column(name = "join_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime joinDate;

  @Column(name = "privilege", nullable = false, columnDefinition = "varchar(255) DEFAULT 'FT'")
  private String privilege;

  public UserEntity(UserDto userDto) {
    this.email = userDto.getEmail();
    this.password = userDto.getPassword();
    this.nickname = userDto.getNickname();
    this.joinDate = userDto.getJoinDate();
    this.privilege = userDto.getPrivilege();
  }
}
