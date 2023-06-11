package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.CharacterDto;
import com.creatorsnotebook.backend.model.entity.CharacterEntity;
import com.creatorsnotebook.backend.model.entity.ProjectEntity;
import com.creatorsnotebook.backend.model.entity.UserProjectBridgeEntity;
import com.creatorsnotebook.backend.model.repository.CharacterRepository;
import com.creatorsnotebook.backend.model.repository.UserProjectBridgeRepository;
import com.creatorsnotebook.backend.model.repository.UserRepository;
import com.creatorsnotebook.backend.utils.CheckAuthorityUtil;
import com.creatorsnotebook.backend.utils.ImageUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
@Slf4j
public class CharacterServiceImpl implements CharacterSerivce {
  @Autowired
  CharacterRepository characterRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserProjectBridgeRepository userProjectBridgeRepository;

  @Autowired
  CheckAuthorityUtil checkAuthority;

  @Autowired
  ObjectMapper objectMapper;

  @Autowired
  ImageUtil imageUtil;

  /**
   * 신규 캐릭터 객체를 생성합니다.
   *
   * @param projectUuid 연결될 프로젝트 고유번호
   * @param userNo      생성자 번호
   * @return 신규 생성된 캐릭터 객체 DTO
   */
  @Override
  public CharacterDto createNewCharacter(UUID projectUuid, long userNo) {
    CharacterEntity characterEntity = CharacterEntity.builder()
            .projectEntity(ProjectEntity.builder().uuid(projectUuid).build())
            .creator(userRepository.findByNo(userNo))
            .editDate(LocalDateTime.now())
            .dataOrder(new ArrayList<>())
            .data(new HashMap<>())
            .build();
    CharacterEntity savedCharacter = characterRepository.save(characterEntity);
    return CharacterDto.builder()
            .uuid(savedCharacter.getUuid())
            .build();
  }

  /**
   * 캐릭터 고유번호를 기반으로 하나 읽어온다.
   *
   * @param uuid 캐릭터 고유번호
   * @return 캐릭터 dto 객체
   */
  @Override
  public CharacterDto getCharacterByUuid(UUID uuid) {
    CharacterEntity character = characterRepository.findByUuid(uuid);
    return CharacterDto.builder()
            .uuid(character.getUuid())
            .createDate(character.getCreateDate())
            .editDate(character.getEditDate())
            .order(character.getDataOrder())
            .data(character.getData())
            .creatorName(character.getCreator().getNickname())
            .build();
  }

  /**
   * 캐릭터를 삭제한다.
   * 삭제 가능한지 권한 여부도 확인한다.
   * 이미지가 있으면 이미지도 전부 삭제한다.
   *
   * @param characterUuid 캐릭터 고유 번호
   * @param projectUuid   프로젝트 고유 번호
   * @param principal     요청 유저 정보
   * @return 삭제 여부 boolean
   */
  @Override
  public boolean deleteCharacter(UUID characterUuid, UUID projectUuid, Principal principal) {
    long userNo = Long.parseLong(principal.getName());
    UserProjectBridgeEntity userProjectBridge = userProjectBridgeRepository.findByProjectUuidAndUserNo(projectUuid, userNo);
    if (checkAuthority.checkUserHasAuthority(userProjectBridge, 3)) {
      CharacterEntity characterEntity = characterRepository.findByUuid(characterUuid);
      characterEntity.getData().forEach((key, value) -> {
        Map<String, String> datas = objectMapper.convertValue(value, Map.class);
        if ("image".equals(datas.get("type"))) {
          imageUtil.deleteImage(datas.get("value"));
        }
      });
      characterRepository.deleteById(characterUuid);
      return true;
    }
    return false;
  }


  /**
   * 신규 속성을 생성한다.
   *
   * @param data 신규 속성명, 신규 순서 목록
   */
  @Override
  public void createAttribute(Map<String, Object> data) {
    log.info("@char serv impl :: createAttr data = {}", data);
    CharacterEntity characterEntity = characterRepository.findByUuid(UUID.fromString((String) data.get("characterUuid")));
    Map<String, String> characterData = objectMapper.convertValue(data.get("data"), Map.class);
    List<String> order = objectMapper.convertValue(data.get("order"), List.class);
    characterEntity.getData().put((String) data.get("name"), characterData);
    characterEntity.setDataOrder(order);
    characterEntity.setEditDate(LocalDateTime.now());
    characterRepository.save(characterEntity);
  }

  /**
   * 한 캐릭터의 한 데이터 컬럼을 업데이트 한다.
   *
   * @param data 갱신에 필요한 데이터, characterUuid, name(컬럼명), data(하위 내용)을 포함한다.
   * @return 갱신 성공 여부
   */
  @Override
  public boolean updateTextData(Map<String, Object> data) {
    UUID characterUuid = UUID.fromString((String) data.get("characterUuid"));
    String name = (String) data.get("name");
    Map<String, Object> toSave = objectMapper.convertValue(data.get("data"), Map.class);
    log.info("charuuid = {}, name = {}, toSave = {}", characterUuid, name, toSave);
    CharacterEntity characterEntity = characterRepository.findByUuid(characterUuid);
    characterEntity.getData().put(name, toSave);
    characterEntity.getProjectEntity().setEditDate(LocalDateTime.now());
    characterEntity.setEditDate(LocalDateTime.now());
    characterRepository.save(characterEntity);
    return true;
  }

  /**
   * 이미지 내용을 저장한다.
   *
   * @param characterUuid 캐릭터 고유번호
   * @param previousData  이전 데이터에 대한 JSON 형식의 문자열
   *                      -> type, name, value(이전 이미지 이름)이 포함된다.
   * @param image         신규 이미지 데이터
   * @return 신규 이미지 이름
   */
  @Override
  public String saveImage(UUID characterUuid, String previousData, MultipartFile image) {
    try {
      HashMap<String, String> data = objectMapper.readValue(previousData, HashMap.class);
      log.info("data = {}", data);
      String newImageName = imageUtil.saveImage(image);
      if (!"".equals(data.get("value"))) {
        imageUtil.deleteImage(data.get("value"));
      }
      data.put("value", newImageName);
      CharacterEntity characterEntity = characterRepository.findByUuid(characterUuid);
      characterEntity.getData().put(data.get("name"), data);
      characterEntity.getProjectEntity().setEditDate(LocalDateTime.now());
      characterEntity.setEditDate(LocalDateTime.now());
      characterRepository.save(characterEntity);
      log.info("new image name = {}", newImageName);
      return newImageName;
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

  /**
   * 캐릭터 속성 하나를 삭제한다.
   *
   * @param data 캐릭터 정보 맵{
   *             characterUuid,name,type,value
   *             }
   */
  @Override
  public void deleteAttribute(Map<String, String> data) {
    CharacterEntity characterEntity = characterRepository.findByUuid(UUID.fromString(data.get("characterUuid")));
    if ("image".equals(data.get("type"))) {
      imageUtil.deleteImage(data.get("value"));
    }
    characterEntity.getData().remove(data.get("name"));
    characterEntity.getDataOrder().remove(data.get("name"));
    characterEntity.getProjectEntity().setEditDate(LocalDateTime.now());
    characterEntity.setEditDate(LocalDateTime.now());
    characterRepository.save(characterEntity);
  }

  /**
   * 속성의 명칭을 변경한다.
   *
   * @param characterUuid 캐릭터 고유번호
   * @param oldName       기존 이름
   * @param newName       신규 이름
   * @return 변환 성공 여부
   */
  @Override
  public boolean renameAttribute(UUID characterUuid, String oldName, String newName) {
    CharacterEntity characterEntity = characterRepository.findByUuid(characterUuid);
    if (characterEntity == null) {
      return false;
    }
    Map<String, Object> characterData = characterEntity.getData();
    log.info("char data = {}", characterData);
    Map<String, Object> data = (Map) characterData.get(oldName);
    data.put("name", newName);
    characterData.put(newName, data);
    characterData.remove(oldName);

    List<String> order = characterEntity.getDataOrder();
    order.set(order.indexOf(oldName), newName);

    characterRepository.save(characterEntity);
    return true;
  }

  @Override
  public boolean updateAttributeOrder(CharacterDto characterDto) {
    log.info("character uuid = {}", characterDto.getUuid());
    log.info("character order = {}", characterDto.getOrder());
    CharacterEntity characterEntity = characterRepository.findByUuid(characterDto.getUuid());
    characterEntity.setDataOrder(characterDto.getOrder());
    characterRepository.save(characterEntity);
    return true;
  }
}
