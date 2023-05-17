package com.creatorsnotebook.backend.model.dto;

import com.creatorsnotebook.backend.model.entity.UpdateNoteEntity;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateNoteDto {
  private long no;
  private String title;
  private String content;
  private String type;
  private LocalDateTime createDate;

  public UpdateNoteDto(UpdateNoteEntity updateNoteEntity) {
    this.no = updateNoteEntity.getNo();
    this.title = updateNoteEntity.getTitle();
    this.content = updateNoteEntity.getContent();
    this.type = updateNoteEntity.getType();
    this.createDate = updateNoteEntity.getCreateDate();
  }

}
