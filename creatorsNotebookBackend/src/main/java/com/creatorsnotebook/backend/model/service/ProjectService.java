package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.ProjectDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ProjectService {
  ProjectDto createProject(ProjectDto projectDto, MultipartFile image) throws IOException;
}
