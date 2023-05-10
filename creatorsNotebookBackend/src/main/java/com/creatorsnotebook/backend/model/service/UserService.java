package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.exception.AlreadyExistException;
import com.creatorsnotebook.backend.model.entity.UserEntity;

public interface UserService {


  UserEntity findByEmail(String email);

  UserEntity saveNewUser(UserEntity userEntity) throws AlreadyExistException;
}
