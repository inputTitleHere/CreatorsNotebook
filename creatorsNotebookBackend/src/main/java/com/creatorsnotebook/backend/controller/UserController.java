package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.exception.AlreadyExistException;
import com.creatorsnotebook.backend.model.dto.JwtResponseDto;
import com.creatorsnotebook.backend.model.dto.UserDto;
import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.service.UserService;
import com.creatorsnotebook.backend.utils.SimpleResponseObject;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    /**
     * 사용자의 이메일이 사용 가능한지 확인한다.
     *
     * @param email 확인할 이메일
     * @return 해당 이메일로 회원가입이 가능한지에 대한 boolean값. 사용 가능하면 true, 사용 불가하면 false.
     */
    @GetMapping("/checkIfEmailUsable")
    public ResponseEntity<?> checkIfEmailUsable(@RequestParam String email) {
        SimpleResponseObject simpleResponseObject = null;
        if (email == null || "".equals(email)) {
            simpleResponseObject = SimpleResponseObject.builder().data(false).build();
        } else if (userService.existsByEmail(email)) {
            simpleResponseObject = SimpleResponseObject.builder().data(false).build();
        } else {
            simpleResponseObject = SimpleResponseObject.builder().data(true).build();
        }
        return ResponseEntity.ok(simpleResponseObject);
    }

    /**
     * 신규 회원 가입의 기능을 수행한다.
     * 신규 회원의 정보를 받고 서버에 저장한다.
     *
     * @param user Form 형식의 유저데이터.
     * @return 신규 회원의 정보(no 포함)을 클라이언트로 반환한다.
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@ModelAttribute UserDto user) {
        if (user.getEmail() == null) {
            return ResponseEntity.badRequest().build();
        }
        JwtResponseDto savedUser = userService.saveNewUser(user);
        if(savedUser!=null){
            return ResponseEntity.ok(savedUser);
        }else{
            return ResponseEntity.badRequest().body("이미 존재하는 이메일입니다.");
        }
    }

    /**
     * 입력받은 유저정보를 기반으로 로그인을 시도한다.
     *
     * @param user 사용자가 입력한 이메일과 비밀번호가 포함된 유저 정보
     * @return 로그인 성공시 유저정보와 JWT가 포함된 JwtResponseDto 객체. 실패시 null을 반환.
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(UserDto user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().build();
        } else {
            JwtResponseDto responseDto = userService.loginUser(user);
            if (responseDto == null) {
                return ResponseEntity.notFound().build();
            } else {
                return ResponseEntity.ok(responseDto);
            }
        }
    }


}
