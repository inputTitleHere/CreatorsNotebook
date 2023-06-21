package com.creatorsnotebook.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "tag")
@Builder
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class TagEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "no")
  private long no;

  @ManyToOne
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "project.uuid")
  private ProjectEntity projectEntity;

  @Column(name = "tag_name")
  private String tagName;

  /**
   * 태그의 바탕 색상 -> Hex 문자열
   */
  @Column(name = "hex_color")
  private String hexColor;

  /**
   * 태그의 글자 색상 -> Hex 문자열
   */
  @Column(name = "text_color")
  private String textColor;

}
