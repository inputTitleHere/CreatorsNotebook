package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.exception.AlreadyExistException;
import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    /**
     * 이메일로 사용자를 쿼리합니다.
     * @param email 존재여부를 확인할 이메일.
     * @return 사용자가 존재하면 UserEntity를, 없으면 null을 반환합니다.
     */
    @Override
    public UserEntity findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * 신규 유저의 비밀번호를 암호화하여 서버에 저장합니다.
     * @param userEntity 저장할 신규 유저의 객체
     * @return 저장한 신규 사용자의 번호(no)가 담긴 UserEntity 객체
     */
    @Override
    public UserEntity saveNewUser(UserEntity userEntity) throws AlreadyExistException{
        if(userRepository.existsByEmail(userEntity.getEmail())){
            throw new AlreadyExistException("이미 등록된 이메일입니다.");
        }
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        return userRepository.save(userEntity);
    }
}
