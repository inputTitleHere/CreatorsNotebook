package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.CharacterTemplateDto;
import com.creatorsnotebook.backend.model.entity.CharacterTemplateEntity;
import com.creatorsnotebook.backend.model.entity.ProjectEntity;
import com.creatorsnotebook.backend.model.repository.CharacterTemplateRepository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class CharacterTemplateServiceImpl implements CharacterTemplateService {
  @Autowired
  CharacterTemplateRepository characterTemplateRepository;

  @Override
  public CharacterTemplateDto createNewTemplate(CharacterTemplateDto dto) {
    log.info("dto = {}", dto);
    CharacterTemplateEntity newEntity = CharacterTemplateEntity.builder()
            .name(dto.getName())
            .project(ProjectEntity.builder().uuid(dto.getProjectUuid()).build())
            .dataOrder(dto.getDataOrder())
            .data(dto.getData())
            .createDate(LocalDateTime.now())
            .build();
    CharacterTemplateEntity result = characterTemplateRepository.save(newEntity);
    return new CharacterTemplateDto(result);
  }

  @Override
  public List<CharacterTemplateDto> loadTemplate(UUID projectUuid) {
    List<CharacterTemplateEntity> templateEntities = characterTemplateRepository.findAllByProjectUuid(projectUuid);
    return templateEntities.stream()
            .map((template) -> CharacterTemplateDto.builder()
                    .no(template.getNo())
                    .createDate(template.getCreateDate())
                    .data(template.getData())
                    .dataOrder(template.getDataOrder())
                    .name(template.getName())
                    .build()
            ).toList();
  }
}
