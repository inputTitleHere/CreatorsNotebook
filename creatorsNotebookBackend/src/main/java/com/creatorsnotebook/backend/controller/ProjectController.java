package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.model.dto.ProjectDto;
import com.creatorsnotebook.backend.model.dto.UserProjectBridgeDto;
import com.creatorsnotebook.backend.model.service.ProjectService;
import com.creatorsnotebook.backend.utils.SimpleResponseObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
   *
   * @param projectUuid 프로젝트 고유번호
   * @param principal   인증객체
   * @return 프로젝트 데이터
   */
  @GetMapping("/{projectUuid}")
  public ResponseEntity<?> loadProject(@PathVariable(name = "projectUuid") UUID projectUuid, Principal principal) {
    ProjectDto projectDto = projectService.loadProject(projectUuid, principal);
    if (projectDto == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(SimpleResponseObject.builder().data("비공개 프로젝트").build());
    } else {
      return ResponseEntity.ok(projectDto);
    }
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
   *
   * @param projectDto 프로젝트 데이터
   * @return 제목 변경 성공 여부
   */
  @PutMapping("/changeTitle")
  public ResponseEntity<?> changeProjectTitle(@RequestBody ProjectDto projectDto) {
    boolean isChangeSuccess = projectService.changeProjectTitle(projectDto);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(isChangeSuccess).build());
  }

  /**
   * 프로젝트의 설명을 변경한다.
   *
   * @param projectDto 프로젝트 데이터
   * @return 설명 변경 성공 여부.
   */
  @PutMapping("/changeDescription")
  public ResponseEntity<?> changeProjectDescription(@RequestBody ProjectDto projectDto) {
    boolean isChangeSuccess = projectService.changeProjectDescription(projectDto);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(isChangeSuccess).build());
  }

  /**
   * 프로젝트의 대표 이미지를 변경한다.
   *
   * @param projectDto 변경할 프로젝트 정보
   * @param file       신규 파일 이미지
   * @return 변경 성공시 신규 이미지 이름을, 실패시 null 반환
   */
  @PutMapping("/changeImage")
  public ResponseEntity<?> changeProjectImage(@ModelAttribute ProjectDto projectDto, MultipartFile file) {
    String newImageName = projectService.changeProjectImage(projectDto, file);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(newImageName).build());
  }


}
