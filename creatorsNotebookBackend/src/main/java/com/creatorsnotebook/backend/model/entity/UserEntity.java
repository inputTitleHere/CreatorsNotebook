package com.creatorsnotebook.backend.model.entity;

import com.creatorsnotebook.backend.model.dto.UserDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;


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
@Builder
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "no")
  private long no;

  @Column(name = "email", unique = true)
  private String email;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "nickname", nullable = false)
  private String nickname;

  @Column(name = "join_date", nullable = true, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime joinDate;

  @Column(name = "privilege", nullable = true, columnDefinition = "varchar(255) DEFAULT 'FREETIER'")
  private String privilege;

  @OneToMany(mappedBy = "userEntity")
  private List<UserProjectBridge> bridge;

  public UserEntity(UserDto userDto) {
    this.no= userDto.getNo();
    this.email = userDto.getEmail();
    this.password = userDto.getPassword();
    this.nickname = userDto.getNickname();
    this.joinDate = userDto.getJoinDate();
    this.privilege = userDto.getPrivilege();
  }
}
