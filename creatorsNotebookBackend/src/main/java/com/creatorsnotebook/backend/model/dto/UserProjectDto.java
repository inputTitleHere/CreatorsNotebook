package com.creatorsnotebook.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class UserProjectDto {
  private long no;
  private UserDto userDto;
  private ProjectDto projectDto;
  private String authority;

}
