package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.model.dto.ProjectDto;
import com.creatorsnotebook.backend.model.dto.UserProjectBridgeDto;
import com.creatorsnotebook.backend.model.service.ProjectService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;

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
  public ResponseEntity<?> createNewProject(@ModelAttribute ProjectDto projectDto, @RequestParam(name = "file",required = false) MultipartFile file, Principal principal) throws IOException {
    long userNo = Long.parseLong(principal.getName());
    UserProjectBridgeDto createdProject = projectService.createProject(projectDto,file,userNo);
    return ResponseEntity.ok(createdProject);
  }


  /**
   * JWT토큰에서 습득한 사용자 정보를 바탕으로 접근가능한 프로젝트의 목록에 대한 배열을 반환한다.
   * @param principal JWT에서 추출한 사용자 정보가 포함된 principal
   * @return 프로젝트 정보의 배열
   */
  @GetMapping("/")
  public ResponseEntity<?> loadAllProjects(Principal principal){
    long userNo = Long.parseLong(principal.getName());
    List<ProjectDto> allProjects = projectService.loadAllProjects(userNo);
    return ResponseEntity.ok(allProjects);
  }


}
