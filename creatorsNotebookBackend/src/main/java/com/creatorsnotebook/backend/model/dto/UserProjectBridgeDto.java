package com.creatorsnotebook.backend.model.dto;

import com.creatorsnotebook.backend.model.entity.UserProjectBridgeEntity;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserProjectBridgeDto {
  private long no;
  private ProjectDto projectDto;
  private UserDto userDto;
  private String authority;

  public UserProjectBridgeDto(UserProjectBridgeEntity entity) {
    this.no= entity.getNo();
    this.projectDto=new ProjectDto(entity.getProjectEntity());
    this.userDto = new UserDto(entity.getUserEntity());
    this.authority=entity.getAuthority();
  }
}
