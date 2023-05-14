package com.creatorsnotebook.backend.model.service;

import com.creatorsnotebook.backend.model.dto.JwtResponseDto;
import com.creatorsnotebook.backend.model.dto.UserDto;
import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.repository.UserRepository;
import com.creatorsnotebook.backend.utils.JwtProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtProvider jwtProvider;

    /**
     * 이메일로 사용자를 쿼리합니다.
     *
     * @param email 존재여부를 확인할 이메일.
     * @return 사용자가 존재하면 UserEntity를, 없으면 null을 반환합니다.
     */
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * 신규 유저의 비밀번호를 암호화하여 서버에 저장합니다.
     * 성공시 JWT을 발급하여 곧바로 로그인 처리를 수행합니다.
     *
     * @param userDto 저장할 신규 유저의 DTO 객체
     * @return 신규유저의 정보 및 JWT가 포함된 JwtResponseDto 객체.
     */
    @Override
    public JwtResponseDto saveNewUser(UserDto userDto) {
        UserEntity userEntity = new UserEntity(userDto);
        if (userRepository.existsByEmail(userEntity.getEmail())) {
            return null;
        }
        userEntity.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        UserDto dbUser = new UserDto(userRepository.save(userEntity));
        dbUser.setPassword("");
        JwtResponseDto response = new JwtResponseDto(dbUser, jwtProvider.createJwt(dbUser));
        return response;
    }

    /**
     * 입력받은 이메일과 비밀번호가 저장된 유저에 있는지 검증하고 성공적이면 JWT을 발급합니다.
     *
     * @param userDto 로그인할 유저 정보
     * @return 로그인 성공시 신규 JWT발급, 실패시 null반환
     */
    @Override
    public JwtResponseDto loginUser(UserDto userDto) {
        UserEntity entity = userRepository.findByEmail(userDto.getEmail());
        log.info("dbUser = {}", entity);
        log.info("userDto password = {}", userDto.getPassword());
        if (entity != null && passwordEncoder.matches(userDto.getPassword(), entity.getPassword())) {
            UserDto dbUser = new UserDto(entity);
            dbUser.setPassword("");
            String jwt = jwtProvider.createJwt(dbUser);
            return new JwtResponseDto(dbUser, jwt);
        } else {
            return null;
        }
    }
}
