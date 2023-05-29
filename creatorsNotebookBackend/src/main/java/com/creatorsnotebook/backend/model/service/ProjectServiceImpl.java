package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.ProjectDto;
import com.creatorsnotebook.backend.model.dto.UserProjectBridgeDto;
import com.creatorsnotebook.backend.model.entity.ProjectEntity;
import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.entity.UserProjectBridgeEntity;
import com.creatorsnotebook.backend.model.repository.ProjectRepository;
import com.creatorsnotebook.backend.model.repository.UserProjectBridgeRepository;
import com.creatorsnotebook.backend.model.repository.UserRepository;
import com.creatorsnotebook.backend.utils.ImageUtil;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@Transactional
public class ProjectServiceImpl implements ProjectService {

  @Autowired
  private ImageUtil imageUtil;
  @Autowired
  private ProjectRepository projectRepository;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private UserProjectBridgeRepository userProjectBridgeRepository;

  /**
   * 프로젝트 정보를 받아서 신규 프로젝트를 생성한다.
   * 공개여부는 기본적으로 비공개.
   * 이미지가 존재하면 저장. 없으면 null
   *
   * @param projectDto 사용자로 부터 전달받은 프로젝트 생성 정보
   * @param file       사용자로 부터 전달받은 이미지 파일. 전달하지 않을 수도 있다.
   * @param userNo     JWT에서 추출한 사용자 고유번호
   * @return 새로 생성한 프로젝트 Dto를 반환한다.
   */
  @Override
  public UserProjectBridgeDto createProject(ProjectDto projectDto, MultipartFile file, long userNo) throws IOException {
    // 이미지 배치
    String imageName = imageUtil.saveImage(file);
    if (imageName != null) {
      projectDto.setImage(imageName);
    }
    // 시간정보 생성
    LocalDateTime now = LocalDateTime.now();
    projectDto.setCreateDate(now);
    projectDto.setEditDate(now);

    ProjectEntity projectEntity = projectRepository.save(new ProjectEntity(projectDto));
    UserEntity userEntity = userRepository.findByNo(userNo);
    UserProjectBridgeEntity userProjectBridgeEntity = UserProjectBridgeEntity.builder()
            .userEntity(userEntity)
            .projectEntity(projectEntity)
            .authority("CREATOR")
            .build();
    userProjectBridgeRepository.save(userProjectBridgeEntity);
    return new UserProjectBridgeDto(userProjectBridgeEntity);
  }


  /**
   * 해당 사용자 번호가 소속한 모든 프로젝트를 로드한다.
   *
   * @param userNo 유저 토큰에서 회수한 유저번호.
   * @return 유저가 접근가능한 프로젝트의 목록
   */
  @Override
  public List<ProjectDto> loadAllProjects(long userNo) {
//    UserEntity user = UserEntity.builder().no(userNo).build();
    List<UserProjectBridgeEntity> result = userProjectBridgeRepository.findAllFetchJoinByUserEntity(userNo);
//    List<UserProjectBridgeEntity> result = userProjectBridgeRepository.loadJoinedProjects(userNo);
    return result
            .stream()
            .map(userProjectBridgeEntity -> {
              ProjectDto projectDto = new ProjectDto(userProjectBridgeEntity.getProjectEntity());
              projectDto.setAuthority(userProjectBridgeEntity.getAuthority());
              projectDto.setBridgeNo(userProjectBridgeEntity.getNo());
              return projectDto;
            })
            .toList();
  }

  /**
   * 프로젝트 삭제를 수행한다.
   * @param projectUuid 삭제할 프로젝트 UUID
   * @param userNo 삭제 요청을 하는 유저의 번호.
   * @return 프로젝트 삭제 성공 여부
   */
  @Override
  public boolean deleteProject(UUID projectUuid, long userNo) {
    UserProjectBridgeEntity bridge = userProjectBridgeRepository.findByProjectUuidAndUserNo(projectUuid,userNo);
    if(bridge!=null && ("CREATOR".equals(bridge.getAuthority())||"ADMIN".equals(bridge.getAuthority()))){
      ProjectEntity projectEntity = bridge.getProjectEntity();
      if(projectEntity.getImage()!=null || "".equals(projectEntity.getImage())){
        imageUtil.deleteImage(projectEntity.getImage());
      }
      projectRepository.delete(bridge.getProjectEntity());
      return true;
    }
    return false;
  }
}

