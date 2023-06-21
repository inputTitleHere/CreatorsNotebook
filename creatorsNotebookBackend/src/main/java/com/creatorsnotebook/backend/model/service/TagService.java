package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.CharacterTagBridgeDto;
import com.creatorsnotebook.backend.model.dto.TagDto;

import java.util.List;
import java.util.UUID;

public interface TagService {
  List<TagDto> getProjectTags(UUID projectUuid);

  TagDto createTag(TagDto tagDto);

  void addCharacterTag(CharacterTagBridgeDto characterTagBridgeDto);

  void removeCharacterTag(CharacterTagBridgeDto characterTagBridgeDto);

  void deleteTag(long tagNo);
}
