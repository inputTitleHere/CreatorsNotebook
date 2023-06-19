package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.model.dto.CharacterTagBridgeDto;
import com.creatorsnotebook.backend.model.dto.TagDto;
import com.creatorsnotebook.backend.model.service.TagService;
import com.creatorsnotebook.backend.utils.SimpleResponseObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tag")
@Slf4j
public class TagController {

  @Autowired
  TagService tagService;

  /**
   * 프로젝트에 포함된 태그를 모두 가져온다.
   *
   * @param projectUuid 프로젝트 고유번호
   * @return 태그배열
   */
  @GetMapping("/getAllTags")
  public ResponseEntity<?> getProjectTags(@RequestParam UUID projectUuid) {
    List<TagDto> tags = tagService.getProjectTags(projectUuid);
    return ResponseEntity.ok(tags);
  }

  /**
   * @param tagDto 저장할 태그 정보가 담긴 DTO 객체
   * @return 신규 생성한 태그번호가 포함된 태그 객체
   */
  @PostMapping("/create")
  public ResponseEntity<?> createTag(@RequestBody TagDto tagDto) {
    TagDto newTag = tagService.createTag(tagDto);
    return ResponseEntity.ok(newTag);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<?> deleteTag(@RequestParam long tagNo){
    tagService.deleteTag(tagNo);

    return ResponseEntity.ok(SimpleResponseObject.builder().data(true).build());
  }

  @PostMapping("/tag")
  public ResponseEntity<?> addCharacterTag(@RequestBody CharacterTagBridgeDto characterTagBridgeDto){
    tagService.addCharacterTag(characterTagBridgeDto);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(true).build());
  }


  @DeleteMapping("/untag")
  public ResponseEntity<?> removeCharacterTag(@RequestBody CharacterTagBridgeDto characterTagBridgeDto){
    tagService.removeCharacterTag(characterTagBridgeDto);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(true).build());
  }
}
