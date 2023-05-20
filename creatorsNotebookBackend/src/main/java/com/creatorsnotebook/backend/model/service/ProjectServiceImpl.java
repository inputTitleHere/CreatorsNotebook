package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.ProjectDto;
import com.creatorsnotebook.backend.model.repository.ProjectRepository;
import com.creatorsnotebook.backend.utils.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class ProjectServiceImpl implements ProjectService {

  @Autowired
  private ImageUtil imageUtil;
  @Autowired
  private ProjectRepository projectRepository;

  /**
   * 프로젝트 정보를 받아서 신규 프로젝트를 생성한다.
   *
   * @param projectDto 사용자로 부터 전달받은 프로젝트 생성 정보
   * @param file       사용자로 부터 전달받은 이미지 파일. 전달하지 않을 수도 있다.
   * @return 새로 생성한 프로젝트 Dto를 반환한다.
   */
  @Override
  public ProjectDto createProject(ProjectDto projectDto, MultipartFile file) throws IOException {
    String imageName = saveImage(file);
    if (imageName != null) {
      projectDto.setImage(imageName);
    }

    // TODO -> persist to DB & Create Bridge.

    return projectDto;
  }

  /**
   * 이미지를 저장한 이후 신규 생성된 이미지 이름을 반환한다.
   *
   * @param file
   */
  private String saveImage(MultipartFile file) throws IOException {
    if (!file.isEmpty() && file.getOriginalFilename() != null) {
      String imageName = file.getOriginalFilename();
      String extension = imageName.substring(imageName.lastIndexOf("."));
      String newName = imageUtil.generateName(extension);
      file.transferTo(imageUtil.generateFile(newName));
      return newName;
    }
    return null;
  }
}

