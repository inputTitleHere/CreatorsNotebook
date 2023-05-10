package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;


    @Override
    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
