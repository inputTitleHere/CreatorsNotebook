package com.creatorsnotebook.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "user_project_bridge")
@Builder
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class UserProjectBridgeEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "no")
  private long no;

  @ManyToOne
  @JoinColumn(name = "project.uuid")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private ProjectEntity projectEntity;

  @ManyToOne
  @JoinColumn(name = "user.no")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private UserEntity userEntity;

  /**
   * 해당 유저가 해당 프로젝트에 가진 권한을 명시
   * VIEWER, MEMBER, ADMIN, OWNER
   * <ul>
   *   <li>CREATOR : 프로젝트 생성자에게만 주어지는 권한. </li>
   *   <li>ADMIN : 프로젝트에 대한 모든 CRUD및 멤버관리 기능을 보유한다. ADMIN끼리 서로 제거 가능하다.</li>
   *   <li>MEMBER : 읽기 및 내용 수정이 가능하지만 멤버관리 권한이 없다.</li>
   *   <li>VIEWER : 읽기만 가능하며 수정은 불가능하다.</li>
   * </ul>
   */
  @Column(name = "authority", nullable = false, columnDefinition = "varchar(50) default 'VIEWER'")
  private String authority;

}
