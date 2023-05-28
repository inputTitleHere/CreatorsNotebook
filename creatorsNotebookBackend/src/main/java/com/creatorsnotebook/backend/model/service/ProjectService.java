package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.ProjectDto;
import com.creatorsnotebook.backend.model.dto.UserProjectBridgeDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface ProjectService {
  UserProjectBridgeDto createProject(ProjectDto projectDto, MultipartFile image, long userNo) throws IOException;

  List<ProjectDto> loadAllProjects(long userNo);

  boolean deleteProject(UUID projectUuid, long userNo);
}
