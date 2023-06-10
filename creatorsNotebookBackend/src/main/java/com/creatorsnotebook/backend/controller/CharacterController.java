package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.model.dto.CharacterDto;
import com.creatorsnotebook.backend.model.service.CharacterSerivce;
import com.creatorsnotebook.backend.utils.SimpleResponseObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
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
   *
   * @param characterUuid 캐릭터 고유번호
   * @param projectUuid   프로젝트 고유번호
   * @param principal     요청 유저 정보
   * @return 삭제 성공 여부의 boolean
   */
  @DeleteMapping("/delete")
  public ResponseEntity<?> deleteCharacter(@RequestParam UUID characterUuid, @RequestParam UUID projectUuid, Principal principal) {
    log.info("@CharacterController::deleteCharacter -> characterUUID = {}", characterUuid);
    boolean result = characterSerivce.deleteCharacter(characterUuid, projectUuid, principal);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(result).build());
  }

  @PostMapping("/insertAttr")
  public ResponseEntity<?> createAttribute(@RequestBody Map<String, Object> data) {
    characterSerivce.createAttribute(data);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(true).build());
  }

  /**
   * 단문, 장문 데이터를 업데이트 한다.
   *
   * @param data 업데이트 데이터
   * @return 성공여부
   */
  @PostMapping("/updateText")
  public ResponseEntity<?> updateTextData(@RequestBody Map<String, Object> data) {
    boolean result = characterSerivce.updateTextData(data);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(result).build());
  }

  /**
   * 신규 이미지를 저장한다.
   * @param characterUuid 이미지를 저장할 캐릭터 고유번호
   * @param previousData 이전 이미지 데이터의 JSON 문자열 -> 속성이름 name과 속성값(이전 이미지 이름) value가 필요.
   * @param image 이미지 Multipart file
   * @return 서버에 저장된 신규 이미지 이름
   */
  @PostMapping("/saveImage")
  public ResponseEntity<?> saveImage(@RequestParam UUID characterUuid, @RequestParam String previousData ,@RequestParam MultipartFile image){
    String newImageName = characterSerivce.saveImage(characterUuid,previousData,image);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(newImageName).build());
  }

  /**
   * 속성을 삭제한다.
   * @param data type, name, value를 포함
   */
  @DeleteMapping("/deleteAttribute")
  public ResponseEntity<?> deleteAttribute(@RequestBody Map<String,String> data){
    characterSerivce.deleteAttribute(data);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(true).build());
  }

  /**
   * 속성명을 변경한다.
   * @param characterUuid 캐릭터 고유번호
   * @param oldName 기존 명칭
   * @param newName 신규 명칭
   * @return 변경 성공여부
   */
  @PutMapping("/renameAttribute")
  public ResponseEntity<?> renameAttribute(@RequestParam UUID characterUuid, @RequestParam String oldName, @RequestParam String newName){
    boolean res = characterSerivce.renameAttribute(characterUuid,oldName,newName);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(res).build());
  }

}
