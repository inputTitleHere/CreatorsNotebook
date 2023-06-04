package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.CharacterDto;

import java.util.UUID;

public interface CharacterSerivce {

  CharacterDto createNewCharacter(UUID projectUuid, long userNo);

  CharacterDto getCharacterByUuid(UUID uuid);
}
