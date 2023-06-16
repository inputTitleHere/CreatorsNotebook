package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.CharacterTemplateDto;

import java.util.List;
import java.util.UUID;

public interface CharacterTemplateService {
  CharacterTemplateDto createNewTemplate(CharacterTemplateDto dto);

  List<CharacterTemplateDto> loadTemplate(UUID projectUuid);

  boolean deleteTemplate(long no);
}
