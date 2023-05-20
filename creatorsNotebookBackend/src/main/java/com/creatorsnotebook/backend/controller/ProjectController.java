package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.model.dto.ProjectDto;
import com.creatorsnotebook.backend.model.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 프로젝트와 관련된 요청을 처리한다.
 * "/project" 경로로 요청되며 User-Project-Bridge까지 관리.
 */
@RestController
@Slf4j
@RequestMapping("/project")
public class ProjectController {

  @Autowired
  private ProjectService projectService;

  /**
   * 신규 프로젝트를 생성한다.
   * @param projectDto 프로젝트 정보가 담긴 객체
   * @param file 프로젝트 이미지가 담긴 MultipartFile
   * @return 새로 생성된 프로젝트 Dto
   * @throws IOException 이미지 저장이 실패한 경우 던져지는 에러.
   */
  @PostMapping("/new")
  public ResponseEntity<?> createNewProject(@ModelAttribute ProjectDto projectDto, @RequestParam(name = "file",required = false) MultipartFile file) throws IOException {
    log.info("fileSize = {}",file.getSize());
    ProjectDto newProjectDto = projectService.createProject(projectDto,file);
    log.info("projectDto = {}",newProjectDto);

    return ResponseEntity.ok(newProjectDto);
  }

}
