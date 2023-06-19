package com.creatorsnotebook.backend.model.dto;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CharacterTagBridgeDto {
  private long no;
  private CharacterDto characterDto;
  private TagDto tagDto;
}
