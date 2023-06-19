package com.creatorsnotebook.backend.model.dto;

import lombok.*;

import java.util.UUID;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TagDto {

  private long no;
  private ProjectDto projectDto;
  private UUID projectUuid;
  private String tagName;
  private String hexColor;
  private String textColor;

}
