package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.CharacterDto;
import com.creatorsnotebook.backend.model.dto.CharacterTagBridgeDto;
import com.creatorsnotebook.backend.model.dto.TagDto;
import com.creatorsnotebook.backend.model.entity.CharacterEntity;
import com.creatorsnotebook.backend.model.entity.CharacterTagBridgeEntity;
import com.creatorsnotebook.backend.model.entity.ProjectEntity;
import com.creatorsnotebook.backend.model.entity.TagEntity;
import com.creatorsnotebook.backend.model.repository.CharacterRepository;
import com.creatorsnotebook.backend.model.repository.CharacterTagRepository;
import com.creatorsnotebook.backend.model.repository.TagRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
public class TagServiceImpl implements TagService {
  @Autowired
  TagRepository tagRepository;
  @Autowired
  CharacterRepository characterRepository;
  @Autowired
  CharacterTagRepository characterTagRepository;


  /**
   * 프로젝트에 소속된 모든 캐릭터 태그를 불러온다.
   *
   * @param projectUuid 프로젝트 고유번호
   * @return 태그 목록(List<TagDto>)
   */
  @Override
  public List<TagDto> getProjectTags(UUID projectUuid) {
    List<TagEntity> tagEntities = tagRepository.findAllByProjectUuid(projectUuid);
    return tagEntities.stream().map(tagEntity -> TagDto.builder()
            .tagName(tagEntity.getTagName())
            .hexColor(tagEntity.getHexColor())
            .no(tagEntity.getNo())
            .build()
    ).collect(Collectors.toList());
  }

  @Override
  public TagDto createTag(TagDto tagDto) {
    TagEntity tagEntity = TagEntity.builder()
            .projectEntity(ProjectEntity.builder().uuid(tagDto.getProjectUuid()).build())
            .tagName(tagDto.getTagName())
            .hexColor(tagDto.getHexColor())
            .textColor(tagDto.getTextColor())
            .build();
    TagEntity savedTag = tagRepository.save(tagEntity);
    return TagDto.builder()
            .no(savedTag.getNo())
            .tagName(savedTag.getTagName())
            .hexColor(savedTag.getHexColor())
            .textColor(savedTag.getTextColor())
            .build();
  }

  /**
   * 캐릭터에 신규 태그를 연결한다.
   * @param characterTagBridgeDto 연결정보 {캐릭터 고유번호, 태그 고유번호}
   */
  @Override
  public void addCharacterTag(CharacterTagBridgeDto characterTagBridgeDto) {
    UUID characterUuid = characterTagBridgeDto.getCharacterDto().getUuid();
    long tagNo = characterTagBridgeDto.getTagDto().getNo();
    CharacterTagBridgeEntity entity = CharacterTagBridgeEntity.builder()
            .characterEntity(characterRepository.getReferenceById(characterUuid))
            .tagEntity(tagRepository.getReferenceById(tagNo))
            .build();
    characterTagRepository.save(entity);
  }

  /**
   * 캐릭터에 등록한 태그를 삭제한다.
   * @param characterTagBridgeDto 캐릭터 태그 정보 -> {캐릭터 고유번호, 태그 고유번호}
   */
  @Override
  public void removeCharacterTag(CharacterTagBridgeDto characterTagBridgeDto) {
    UUID characterUuid = characterTagBridgeDto.getCharacterDto().getUuid();
    long tagNo = characterTagBridgeDto.getTagDto().getNo();
    characterTagRepository.deleteCharacterTag(characterUuid,tagNo);
  }

  /**
   * 태그를 삭제한다.
   * 만약 다른 캐릭터가 태그를 사용하고 있어도 Bridge를 삭제함으로써 모두 지운다.
   * @param tagNo 삭제할 태그 번호
   */
  @Override
  public void deleteTag(long tagNo) {
    tagRepository.deleteTag(tagNo);
  }
}
