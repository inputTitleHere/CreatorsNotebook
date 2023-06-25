package com.creatorsnotebook.backend.utils;

import org.springframework.stereotype.Component;

import java.security.SecureRandom;

@Component
public class UserUtils {

  private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  private static final String ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  private static final String NUMBERS = "0123456789";
  private static final String SPECIAL_CHARACTERS = "$@!#-=+^&?_~";
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

  /**
   * 신규 무작위 초기화용 비밀번호를 생성한다.
   * 8자리 신규 무작위 인증문자열을 기반으로 무작위 위치에 추가 숫자, 추가 기호를 넣겠다.
   *
   * @return 생성된 무작위 비밀번호
   */
  public String generateRandomPassword() {
    StringBuilder pwdBuilder = new StringBuilder();
    SecureRandom random = new SecureRandom();
    // 일반문자
    for (int i = 0; i < 8; i++) {
      int randomIndex = random.nextInt(ALPHABETS.length());
      char randomChar = ALPHABETS.charAt(randomIndex);
      pwdBuilder.append(randomChar);
    }
    // 숫자
    for (int i = 0; i < 2; i++) {
      int randomIndex = random.nextInt(NUMBERS.length());
      char randomChar = NUMBERS.charAt(randomIndex);
      pwdBuilder.append(randomChar);
    }
    // 특수기호
    for (int i = 0; i < 2; i++) {
      int randomIndex = random.nextInt(SPECIAL_CHARACTERS.length());
      char randomChar = SPECIAL_CHARACTERS.charAt(randomIndex);
      pwdBuilder.append(randomChar);
    }
    // 순서 섞기
    char[] passwordArray = pwdBuilder.toString().toCharArray();
    for (int i = 0; i < passwordArray.length; i++) {
      int randomIndex = random.nextInt(passwordArray.length);
      char temp = passwordArray[i];
      passwordArray[i] = passwordArray[randomIndex];
      passwordArray[randomIndex] = temp;
    }
    return new String(passwordArray);
  }


}
