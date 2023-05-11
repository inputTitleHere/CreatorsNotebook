package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.exception.AlreadyExistException;
import com.creatorsnotebook.backend.model.dto.UserDto;

public interface UserService {


  boolean existsByEmail(String email);

  UserDto saveNewUser(UserDto userEntity) throws AlreadyExistException;

  String loginUser(UserDto user);
}
