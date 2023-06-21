package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.model.dto.CharacterTemplateDto;
import com.creatorsnotebook.backend.model.service.CharacterTemplateService;
import com.creatorsnotebook.backend.utils.SimpleResponseObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/characterTemplate")
public class CharacterTemplateController {
  @Autowired
  CharacterTemplateService characterTemplateService;

  @PostMapping("/new")
  public ResponseEntity<?> createNewTemplate(@RequestBody CharacterTemplateDto dto){
    CharacterTemplateDto result = characterTemplateService.createNewTemplate(dto);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/loadTemplates")
  public ResponseEntity<?> loadTemplates(@RequestParam UUID projectUuid){
    List<CharacterTemplateDto> templateList = characterTemplateService.loadTemplate(projectUuid);
    log.info("templates = {}",templateList);
    return ResponseEntity.ok(templateList);
  }

  @DeleteMapping("/delete")
  public ResponseEntity<?> deleteTemplate(@RequestParam long no){
    boolean result = characterTemplateService.deleteTemplate(no);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(result).build());
  }

}
