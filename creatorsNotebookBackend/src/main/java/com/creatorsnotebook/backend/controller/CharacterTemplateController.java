package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.model.dto.CharacterTemplateDto;
import com.creatorsnotebook.backend.model.service.CharacterTemplateService;
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

  @PostMapping("/newTemplate")
  public ResponseEntity<?> createNewTemplate(@RequestBody CharacterTemplateDto dto){
    CharacterTemplateDto result = characterTemplateService.createNewTemplate(dto);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/loadTemplate")
  public ResponseEntity<?> loadTemplate(@RequestParam UUID projectUuid){
    List<CharacterTemplateDto> templateList = characterTemplateService.loadTemplate(projectUuid);
    return ResponseEntity.ok(templateList);
  }

}
