package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.CharacterDto;
import com.creatorsnotebook.backend.model.entity.CharacterEntity;
import com.creatorsnotebook.backend.model.entity.ProjectEntity;
import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.repository.CharacterRepository;
import com.creatorsnotebook.backend.model.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
