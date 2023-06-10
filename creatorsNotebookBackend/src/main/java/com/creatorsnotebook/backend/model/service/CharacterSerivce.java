package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.CharacterDto;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.Map;
import java.util.UUID;

public interface CharacterSerivce {

  CharacterDto createNewCharacter(UUID projectUuid, long userNo);

  CharacterDto getCharacterByUuid(UUID uuid);

  boolean deleteCharacter(UUID characterUuid, UUID projectUuid, Principal principal);


  boolean updateTextData(Map<String, Object> data);

  void createAttribute(Map<String, Object> data);

  String saveImage(UUID characterUuid, String previousData, MultipartFile image);



  void deleteAttribute(Map<String, String> data);

  boolean renameAttribute(UUID characterUuid, String oldName, String newName);
}
