package com.creatorsnotebook.backend.model.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Type;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name ="template")
@Builder
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class TemplateEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "no")
  private long no;

  @ManyToOne
  @JoinColumn(name = "project.uuid")
  private ProjectEntity projectEntity;

  /**
   * 해당 템플릿이 어떤 타입의 템플릿인지
   * 캐릭터 생성용 템플릿 -> character 와 같은 방식으로.
   * 차후 확장성을 위한 배치.
   */
  @Column(name = "type")
  private String type;

  @Type(JsonType.class)
  @Column(columnDefinition = "jsonb")
  private List<String> dataOrder = new ArrayList<>();

  @Type(JsonType.class)
  @Column(columnDefinition = "jsonb")
  private Map<String, Object> data = new HashMap<>();

  @Column(name = "create_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime createDate;

}
