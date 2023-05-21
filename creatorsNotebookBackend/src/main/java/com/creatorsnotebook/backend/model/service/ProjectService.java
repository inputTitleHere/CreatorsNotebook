package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.ProjectDto;
import com.creatorsnotebook.backend.model.dto.UserProjectBridgeDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProjectService {
  UserProjectBridgeDto createProject(ProjectDto projectDto, MultipartFile image, long userNo) throws IOException;

  List<ProjectDto> loadAllProjects(long userNo);
}
