package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.exception.AlreadyExistException;
import com.creatorsnotebook.backend.model.dto.JwtResponseDto;
import com.creatorsnotebook.backend.model.dto.UserDto;

public interface UserService {


  boolean existsByEmail(String email);

  JwtResponseDto saveNewUser(UserDto userEntity);

  JwtResponseDto loginUser(UserDto user);
}
