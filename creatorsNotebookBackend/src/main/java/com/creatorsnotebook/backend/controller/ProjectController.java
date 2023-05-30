package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.model.dto.ProjectDto;
import com.creatorsnotebook.backend.model.dto.UserProjectBridgeDto;
import com.creatorsnotebook.backend.model.service.ProjectService;
import com.creatorsnotebook.backend.utils.SimpleResponseObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.UUID;

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
   *
   * @param projectDto 프로젝트 정보가 담긴 객체
   * @param file       프로젝트 이미지가 담긴 MultipartFile
   * @return 새로 생성된 프로젝트 Dto
   * @throws IOException 이미지 저장이 실패한 경우 던져지는 에러.
   */
  @PostMapping("/new")
  public ResponseEntity<?> createNewProject(@ModelAttribute ProjectDto projectDto, @RequestParam(name = "file", required = false) MultipartFile file, Principal principal) throws IOException {
    long userNo = Long.parseLong(principal.getName());
    UserProjectBridgeDto createdProject = projectService.createProject(projectDto, file, userNo);
    return ResponseEntity.ok(createdProject);
  }


  /**
   * JWT토큰에서 습득한 사용자 정보를 바탕으로 접근가능한 프로젝트의 목록에 대한 배열을 반환한다.
   *
   * @param principal JWT에서 추출한 사용자 정보가 포함된 principal
   * @return 프로젝트 정보의 배열
   */
  @GetMapping("/")
  public ResponseEntity<?> loadAllProjects(Principal principal) {
    List<ProjectDto> allProjects = projectService.loadAllProjects(principal);
    return ResponseEntity.ok(allProjects);
  }

  /**
   * 프로젝트에 소속된 모든 정보를 로딩한다.
   * @param projectUuid 프로젝트 고유번호
   * @param principal 인증객체
   * @return 프로젝트 데이터
   */
  @GetMapping("/{projectUuid}")
  public ResponseEntity<?> loadProject(@PathVariable(name = "projectUuid") UUID projectUuid, Principal principal) {
    ProjectDto projectDto = projectService.loadProject(projectUuid, principal);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(projectDto).build());
  }

  /**
   * 프로젝트를 삭제하는 API, 단 권한을 확인 한 이후에 삭제를 수행한다.
   *
   * @param projectUuid 삭제할 프로젝트 UUID
   * @param principal   Spring Security로부터 전달받을 사용자 정보
   * @return 삭제 여부
   */
  @DeleteMapping("/delete")
  public ResponseEntity<?> deleteProject(@RequestParam(name = "uuid") UUID projectUuid, Principal principal) {
    long userNo = Long.parseLong(principal.getName());
    boolean result = projectService.deleteProject(projectUuid, userNo);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(result
    ).build());
  }

  /**
   * 프로젝트의 제목을 변경한다.
   * @return 제목 변경 성공 여부
   * TODO -> service기능완성하기
   */
  @PutMapping("/changeTitle")
  public ResponseEntity<?> changeProjectTitle(){
    log.info("CHANGE PROJECT TITLE");
    return ResponseEntity.ok(SimpleResponseObject.builder().data(false).build());
  }


}
