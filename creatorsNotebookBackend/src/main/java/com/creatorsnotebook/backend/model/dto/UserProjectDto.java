package com.creatorsnotebook.backend.model.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProjectDto {
  private long no;
  private UserDto userDto;
  private ProjectDto projectDto;
  private String authority;

}
