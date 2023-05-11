package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.exception.AlreadyExistException;
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
     * 사용자의 이메일이 사용 가능한지 확인
     * 입력 무결성 처리 진행.
     *
     * @param email 확인할 이메일
     * @return 해당 이메일로 회원가입이 가능한지에 대한 boolean값. 사용 가능하면 true, 사용 불가하면 false.
     */
    @GetMapping("/checkIfEmailUsable")
    public ResponseEntity<?> checkIfEmailUsable(@RequestParam String email) {
        SimpleResponseObject simpleResponseObject = null;
        if (email == null || "".equals(email) || userService.existsByEmail(email)) {
            simpleResponseObject = SimpleResponseObject.builder().data(false).build();
        } else {
            simpleResponseObject = SimpleResponseObject.builder().data(true).build();
        }
        return ResponseEntity.ok(simpleResponseObject);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@ModelAttribute UserDto user){
        if(user.getEmail()==null){
            return ResponseEntity.badRequest().build();
        }
        try{
            UserDto savedUser = userService.saveNewUser(user);
            return ResponseEntity.ok(savedUser);
        }catch (AlreadyExistException e){
            return ResponseEntity.badRequest().body(SimpleResponseObject.builder().data("Already Existing User.").build());
        }catch (Exception ex){
            ex.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(UserDto user){
        if(user.getEmail()==null || user.getPassword() == null){
            return ResponseEntity.badRequest().build();
        }else{
            String token = userService.loginUser(user);
            if(token==null){

            }else{

            }
        }
    }





}
