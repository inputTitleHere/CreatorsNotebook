package com.creatorsnotebook.backend.model.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "character_template")
@Builder
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class CharacterTemplateEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "no")
  private long no;

  @ManyToOne
  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name="project.uuid")
  private ProjectEntity project;

  @Column(name = "name",nullable = false)
  private String name;

  @Type(JsonType.class)
  @Column(columnDefinition = "jsonb")
  private List<String> dataOrder = new ArrayList<>();

  @Type(JsonType.class)
  @Column(columnDefinition = "jsonb")
  private Map<String, Object> data = new HashMap<>();

  @Column(name = "create_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  @CreationTimestamp
  private LocalDateTime createDate;


}
