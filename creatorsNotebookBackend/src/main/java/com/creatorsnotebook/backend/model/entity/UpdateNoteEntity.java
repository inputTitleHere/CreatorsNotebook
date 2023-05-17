package com.creatorsnotebook.backend.model.entity;

import com.creatorsnotebook.backend.model.dto.UpdateNoteDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "update_note")
@Getter
@Setter
@Builder
@DynamicUpdate
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
public class UpdateNoteEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "no")
  private long no;

  @Column(name = "title")
  private String title;

  @Column(name = "content", columnDefinition = "TEXT")
  private String content;

  @Column(name = "type")
  private String type;

  @Column(name = "create_date", columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
  private LocalDateTime createDate;

  public UpdateNoteEntity(UpdateNoteDto updateNoteDto) {
    this.no = updateNoteDto.getNo();
    this.title = updateNoteDto.getTitle();
    this.content = updateNoteDto.getContent();
    this.type = updateNoteDto.getType();
    this.createDate = updateNoteDto.getCreateDate();
  }


}
