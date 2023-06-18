package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.TagDto;
import com.creatorsnotebook.backend.model.entity.TagEntity;
import com.creatorsnotebook.backend.model.repository.CharacterTagRepository;
import com.creatorsnotebook.backend.model.repository.TagRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TagServiceImpl implements TagService {
  @Autowired
  TagRepository tagRepository;

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
}
