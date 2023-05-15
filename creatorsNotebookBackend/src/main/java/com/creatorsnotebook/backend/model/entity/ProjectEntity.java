package com.creatorsnotebook.backend.model.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

/**
 * Project 테이블에 대한 Entity
 * <ul>
 *     <li>UUID uuid : 프로젝트 고유 번호</li>
 *     <li>String title : 프로젝트 고유 번호</li>
 *     <li>String image : 프로젝트 고유 번호</li>
 *     <li>String description : 프로젝트 고유 번호</li>
 *     <li>LocalDateTime createdDate : 프로젝트 고유 번호</li>
 *     <li>LocalDateTime EditDate : 프로젝트 고유 번호</li>
 *     <li>boolean openToPublic : 프로젝트 고유 번호</li>
 * </ul>
 */
@Entity
@Table(name = "project")
@Getter
@Setter
@Builder
@DynamicUpdate
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
public class ProjectEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "uuid", columnDefinition = "UUID")
  private UUID uuid;

  @Column(name = "title",nullable = false)
  private String title;

  @Column(name = "image", columnDefinition = "varchar(255) default 'no_img'")
  private String image;

  @Column(name = "description", columnDefinition = "text")
  private String description;

  @Column(name = "create_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime createDate;

  @Column(name = "edit_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime editDate;

  /**
   * 프로젝트 URL을 보유한 사람이면 누구나 볼 수 있는지에 대한 Boolean값을 저장합니다.
   * true이면 누구나 볼 수 있는 공개된 프로젝트이며 false이면 비공개 프로젝트입니다.
   * 단, 유저-프로젝트 브릿지로 연결된 유저는 언제나 볼 수 있습니다.
   */
  @Column(name = "open_to_public", nullable = false, columnDefinition = "boolean default false")
  private boolean openToPublic;

  @OneToMany(mappedBy = "projectEntity")
  private List<UserProjectBridge> bridge;
}
