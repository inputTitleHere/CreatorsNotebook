package com.creatorsnotebook.backend.model.dto;

import com.creatorsnotebook.backend.model.entity.CharacterAttribute;
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
  private Map<String, CharacterAttribute> data;
  private String creatorName;
  private List<CharacterTagBridgeDto> tags;
  private List<Long> tagList;

}
