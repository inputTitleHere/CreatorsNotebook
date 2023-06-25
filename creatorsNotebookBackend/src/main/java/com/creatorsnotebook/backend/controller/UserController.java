package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.exception.AlreadyExistException;
import com.creatorsnotebook.backend.model.dto.JwtResponseDto;
import com.creatorsnotebook.backend.model.dto.UserDto;
import com.creatorsnotebook.backend.model.entity.UserEntity;
import com.creatorsnotebook.backend.model.service.UserService;
import com.creatorsnotebook.backend.utils.SimpleResponseObject;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

/**
 * 사용자와 관련된 요청을 처리하는 UserController
 */
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
    SimpleResponseObject responseObject = userService.saveNewUser(user);
    if (responseObject == null) {
      return ResponseEntity.badRequest().build();
    } else {
      return ResponseEntity.ok(responseObject);
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
    log.info("user -> {}", user);
    if (user.getEmail() == null || user.getPassword() == null) {
      return ResponseEntity.badRequest().body(SimpleResponseObject.builder().data("DATA NULL").build());
    } else {
      JwtResponseDto responseDto = userService.loginUser(user);
      if (responseDto == null) {
        return ResponseEntity.notFound().build();
      } else {
        return ResponseEntity.ok(responseDto);
      }
    }
  }

  /**
   * 토큰에서 사용자 번호를 추출해 User정보를 DB에서 쿼리해온다.
   * 토큰을 사용한 재접속을 허용하기 위함이다.
   *
   * @param principal JWT에서 추출해 security에 저장한 사용자 번호를 입력받는다.
   * @return 사용자가 존재하면 해당 사용자 객체를 반환한다.
   */
  @GetMapping("/fromToken")
  public ResponseEntity<?> loadUserFromToken(Principal principal) {
    long userNo = Long.parseLong(principal.getName());
    log.info("principal = {}", userNo);
    UserDto userDto = userService.findByNo(userNo);
    if (userDto == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    } else {
      return ResponseEntity.ok(userDto);
    }
  }


  /**
   * 사용자의 비밀번호를 변경한다.
   *
   * @param email            사용자 이메일
   * @param originalPassword 사용자 기존 비밀번호
   * @param newPassword      사용자 신규 비밀번호
   * @return 응답객체
   */
  @PostMapping("/changePassword")
  public ResponseEntity<?> changePassword(@RequestParam("email") String email,
                                          @RequestParam("originalPassword") String originalPassword, @RequestParam("password") String newPassword) {
    SimpleResponseObject simpleResponseObject = userService.changePassword(email, originalPassword, newPassword);
    return ResponseEntity.ok(simpleResponseObject);
  }

  /**
   * 사용자의 계정정보(닉네임)을 변경한다.
   *
   * @param userDto 사용자 정보 객체
   * @return 신규 사용자 정보가 담긴 응답 객체
   */
  @PostMapping("/changeUserInfo")
  public ResponseEntity<?> changeUserInfo(UserDto userDto) {
    log.info("userDto = {}", userDto);
    SimpleResponseObject simpleResponseObject = userService.changeUserInfo(userDto);
    return ResponseEntity.ok(simpleResponseObject);
  }

  /**
   * 비밀번호 인증용 인증 문자열을 생성 및 메일로 전송한다.
   *
   * @param email 전송할 이메일
   * @return 인증용 문자열
   */
  @GetMapping("/authStr")
  public ResponseEntity<?> generateAuthString(@RequestParam String email) {
    Map<String, String> authData = userService.generateAuthString(email);
    return ResponseEntity.ok(authData);
  }

  /**
   * 비밀번호를 초기화한다.
   *
   * @param email 초기화할 대상
   * @return 신규 무작위 생성된 비밀번호
   */
  @PutMapping("/resetPassword")
  public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String key) {
    String newPassword = userService.resetPassword(email, key);
    return ResponseEntity.ok(SimpleResponseObject.builder().data(newPassword).build());
  }


}
