package com.creatorsnotebook.backend.utils;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.Random;

@Component
@NoArgsConstructor
public class ImageUtil {

  @Value("${file.directory}")
  private String fileDirectory;
  private final char[] TABLE = {
          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
          'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
          'u', 'v', 'w', 'x', 'y', 'z',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
          'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
          'U', 'V', 'W', 'X', 'Y', 'Z'
  };

  private final Random random = new Random();


  /**
   * 현재시간 + 무작위 난수 3자리로 구성된 이미지 이름을 생성한다.
   *
   * @param extension 받는 이미지의 확장자(.png, .jpg 등)
   * @return 신규 생성한 시간+숫자기반 이미지 이름
   */
  public String generateName(String extension) {
    String timeInMillies = Long.toString(System.currentTimeMillis());
    String randomTripletTail = generateRandomTriplet();
    return timeInMillies + randomTripletTail + extension;
  }

  /**
   * 이미지를 저장할 File객체를 만든다.
   * @param name 신규 생성한 파일 이름
   * @return 저장할 경로가 설정된 File 객체
   */
  public File generateFile(String name){
    return new File(fileDirectory+"\\"+name);
  }

  /**
   * 3자리의 무작위 문자열을 생성한다.
   * 문자열은 아래의 문자를 포함한다.
   * 0~9, A~Z, a~z
   * @return 3자리 무작위 문자열
   */
  private String generateRandomTriplet() {
    StringBuilder sb = new StringBuilder();
    for(int i=0;i<3;i++){
      sb.append(TABLE[random.nextInt(TABLE.length)]);
    }
    return sb.toString();
  }
}
