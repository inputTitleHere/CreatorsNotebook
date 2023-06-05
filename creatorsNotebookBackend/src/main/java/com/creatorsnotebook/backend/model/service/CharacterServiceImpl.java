package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.CharacterDto;
import com.creatorsnotebook.backend.model.entity.CharacterEntity;
import com.creatorsnotebook.backend.model.entity.ProjectEntity;
import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.entity.UserProjectBridgeEntity;
import com.creatorsnotebook.backend.model.repository.CharacterRepository;
import com.creatorsnotebook.backend.model.repository.UserProjectBridgeRepository;
import com.creatorsnotebook.backend.model.repository.UserRepository;
import com.creatorsnotebook.backend.utils.CheckAuthorityUtil;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

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
  /**
   * 신규 캐릭터 객체를 생성합니다.
   * @param projectUuid 연결될 프로젝트 고유번호
   * @param userNo 생성자 번호
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
   * @param characterUuid 캐릭터 고유 번호
   * @param projectUuid 프로젝트 고유 번호
   * @param principal 요청 유저 정보
   * @return 삭제 여부 boolean
   */
  @Override
  public boolean deleteCharacter(UUID characterUuid, UUID projectUuid, Principal principal) {
    long userNo = Long.parseLong(principal.getName());
    UserProjectBridgeEntity userProjectBridge = userProjectBridgeRepository.findByProjectUuidAndUserNo(projectUuid,userNo);
    if(checkAuthority.checkUserHasAuthority(userProjectBridge,3)){
      characterRepository.deleteById(characterUuid);
      return true;
    }
    return false;
  }
}
