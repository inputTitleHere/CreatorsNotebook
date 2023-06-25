package com.creatorsnotebook.backend.model.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "character_tag_bridge")
@Builder
@Getter
@Setter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
@AllArgsConstructor
public class CharacterTagBridgeEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "no")
  private long no;

  @ManyToOne
  @JoinColumn(name = "character.uuid")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private CharacterEntity characterEntity;

  @ManyToOne
  @JoinColumn(name = "tag.no")
  @OnDelete(action = OnDeleteAction.CASCADE)
  private TagEntity tagEntity;



}
