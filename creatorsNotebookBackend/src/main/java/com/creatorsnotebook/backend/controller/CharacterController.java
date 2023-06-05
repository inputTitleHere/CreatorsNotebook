package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.model.dto.CharacterDto;
import com.creatorsnotebook.backend.model.service.CharacterSerivce;
import com.creatorsnotebook.backend.utils.SimpleResponseObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.UUID;

@RestController
@RequestMapping("/character")
@Slf4j
public class CharacterController {

  @Autowired
  CharacterSerivce characterSerivce;

  /**
   * 신규 캐릭터 객체를 생성한다.
   *
   * @param projectUuid 연결할 프로젝트의 고유번호
   * @return 신규 캐릭터 객체의 기본 정보(UUID, 생성일, 갱신일)을
   */
  @PostMapping("/new")
  public ResponseEntity<?> createNewCharacter(@RequestParam UUID projectUuid, @RequestParam long userNo) {
    log.info("@CharacterController::createNewCharacter = project uuid = {}", projectUuid);
    CharacterDto newCharacter = characterSerivce.createNewCharacter(projectUuid, userNo);
    CharacterDto characterWithFullData = characterSerivce.getCharacterByUuid(newCharacter.getUuid());
    return ResponseEntity.ok(characterWithFullData);
  }

  /**
   * 캐릭터를 삭제한다.
   * @param characterUuid 캐릭터 고유번호
   * @param projectUuid 프로젝트 고유번호
   * @param principal 요청 유저 정보
   * @return 삭제 성공 여부의 boolean
   */
  @DeleteMapping("/delete")
  public ResponseEntity<?> deleteCharacter(@RequestParam UUID characterUuid, @RequestParam UUID projectUuid, Principal principal) {
    log.info("@CharacterController::deleteCharacter -> characterUUID = {}", characterUuid);
    boolean result = characterSerivce.deleteCharacter(characterUuid, projectUuid, principal);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(result).build());
  }


}
