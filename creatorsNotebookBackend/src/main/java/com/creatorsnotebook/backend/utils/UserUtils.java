package com.creatorsnotebook.backend.utils;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class UserUtils {

  private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  private static final int LENGTH = 8;


  /**
   * 인증용 8자리 문자열을 생성한다.
   *
   * @return 8자리 영문 대소문자 및 숫자를 포함한 무작위 문자열
   */
  public String generateAuthString() {
    StringBuilder sb = new StringBuilder(LENGTH);
    SecureRandom random = new SecureRandom();
    for (int i = 0; i < LENGTH; i++) {
      int randomIndex = random.nextInt(CHARACTERS.length());
      char randomChar = CHARACTERS.charAt(randomIndex);
      sb.append(randomChar);
    }
    return sb.toString();
  }


}
