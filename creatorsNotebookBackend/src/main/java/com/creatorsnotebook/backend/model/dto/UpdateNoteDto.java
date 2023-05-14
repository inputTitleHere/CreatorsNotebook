package com.creatorsnotebook.backend.model.dto;

import com.creatorsnotebook.backend.model.entity.UpdateNoteEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Builder
@Getter
@Setter
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
