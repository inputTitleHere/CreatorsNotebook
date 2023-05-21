package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.JwtResponseDto;
import com.creatorsnotebook.backend.model.dto.UserDto;
import com.creatorsnotebook.backend.utils.SimpleResponseObject;

public interface UserService {


  boolean existsByEmail(String email);

  SimpleResponseObject saveNewUser(UserDto userEntity);

  JwtResponseDto loginUser(UserDto user);

    UserDto findByNo(long userNo);
}
