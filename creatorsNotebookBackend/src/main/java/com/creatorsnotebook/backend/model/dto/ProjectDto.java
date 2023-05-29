package com.creatorsnotebook.backend.model.dto;


import com.creatorsnotebook.backend.model.entity.ProjectEntity;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProjectDto {
  private UUID uuid;
  private String title;
  private String image;
  private String description;
  private LocalDateTime createDate;
  private LocalDateTime editDate;
  private boolean openToPublic;

  /**
   * UserProjectBridge에 정의된 권한을 보관/전송하기 위한 변수
   * Builder 또는 Setter으로만 지정.
   */
  private String authority;
  /**
   * UserProjectBridge에 정의된 브릿지 번호를 저장한다.
   * Builder 또는 Setter으로만 지정.
   */
  private long bridgeNo;

  /**
   * 등록된 캐릭터 정보를 보관 및 이송한다.
   * Builder 또는 setter으로 지정.
   */
  private List<CharacterDto> characterDtoList;

  public ProjectDto(ProjectEntity entity) {
    this.uuid = entity.getUuid();
    this.title = entity.getTitle();
    this.image = entity.getImage();
    this.description = entity.getDescription();
    this.createDate = entity.getCreateDate();
    this.editDate = entity.getEditDate();
    this.openToPublic = entity.isOpenToPublic();
  }


}
