package com.creatorsnotebook.backend.model.dto;

import com.creatorsnotebook.backend.model.entity.CharacterTemplateEntity;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ToString(exclude = {"project"})
public class CharacterTemplateDto {
  private long no;
  private ProjectDto project;
  private UUID projectUuid;
  private String name;
  private List<String> dataOrder;
  private Map<String, Object> data;
  private LocalDateTime createDate;

  public CharacterTemplateDto(CharacterTemplateEntity entity){
    this.no=entity.getNo();
    this.name=entity.getName();
    this.dataOrder=entity.getDataOrder();
    this.data=entity.getData();
    this.createDate=entity.getCreateDate();
  }

}
