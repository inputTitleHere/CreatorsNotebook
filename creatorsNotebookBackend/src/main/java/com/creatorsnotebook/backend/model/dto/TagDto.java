package com.creatorsnotebook.backend.model.dto;

import lombok.*;

@Builder
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TagDto {

  private long no;
  private ProjectDto projectDto;
  private String tagName;
  private String hexColor;
  private String textColor;

}
