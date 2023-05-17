package com.creatorsnotebook.backend.model.dto;

import com.creatorsnotebook.backend.model.entity.CharacterEntity;
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
public class CharacterDto {
  private UUID uuid;
  private LocalDateTime createDate;
  private LocalDateTime editDate;
  private List<String> order;
  private Map<String, Object> data;

  public CharacterDto(CharacterEntity characterEntity) {
    this.uuid = characterEntity.getUuid();
    this.createDate = characterEntity.getCreateDate();
    this.editDate = characterEntity.getEditDate();
    this.order = characterEntity.getDataOrder();
    this.data = characterEntity.getData();
  }


}
