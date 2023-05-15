package com.creatorsnotebook.backend.model.dto;

import com.creatorsnotebook.backend.model.entity.TemplateEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TemplateDto {
  private long no;
  private String type;
  private List<String> order;
  private Map<String, Object> data;
  private LocalDateTime createDate;

  public TemplateDto(TemplateEntity templateEntity) {
    this.no = templateEntity.getNo();
    this.type = templateEntity.getType();
    this.order = templateEntity.getDataOrder();
    this.data = templateEntity.getData();
    this.createDate = templateEntity.getCreateDate();
  }
}
