package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

public interface UserService {


    UserEntity findByEmail(String email);
}
