package com.creatorsnotebook.backend.utils;

import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Random;

@Slf4j
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
   * MultipartRequest를 통해 받은
   *
   * @param file Multipart타입의 파일
   * @return 새로 생성한 이미지 이름
   */
  public String saveImage(MultipartFile file) throws IOException {
    if (!file.isEmpty() && file.getOriginalFilename() != null) {
      String imageName = file.getOriginalFilename();
      String extension = imageName.substring(imageName.lastIndexOf("."));
      String newName = generateName(extension);
      file.transferTo(generateFile(newName));
      return newName;
    }
    return null;
  }


  /**
   * 현재시간 + 무작위 난수 3자리로 구성된 이미지 이름을 생성한다.
   *
   * @param extension 받는 이미지의 확장자(.png, .jpg 등)
   * @return 신규 생성한 시간+숫자기반 이미지 이름
   */
  public String generateName(String extension) {
    String timeInMillis = Long.toString(System.currentTimeMillis());
    String randomTripletTail = generateRandomTriplet();
    return timeInMillis + randomTripletTail + extension;
  }

  /**
   * 이미지를 저장할 File객체를 만든다.
   *
   * @param name 신규 생성한 파일 이름
   * @return 저장할 경로가 설정된 File 객체
   */
  public File generateFile(String name) {
    return new File(fileDirectory + "\\" + name);
  }

  /**
   * 3자리의 무작위 문자열을 생성한다.
   * 문자열은 아래의 문자를 포함한다.
   * 0~9, A~Z, a~z
   *
   * @return 3자리 무작위 문자열
   */
  private String generateRandomTriplet() {
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 3; i++) {
      sb.append(TABLE[random.nextInt(TABLE.length)]);
    }
    return sb.toString();
  }

  /**
   * 저장된 이미지를 삭제한다.
   *
   * @param image 서버에 저장된 이미지의 이름
   */
  public void deleteImage(String image) {
    if (image == null || "".equals(image) || image.length() == 0) {
      return;
    }
    try {
      File file = new File(fileDirectory + "\\" + image);
      if (file.delete()) {
        log.info("Deleted file : {}", file);
      } else {
        log.error("Failed to delete image : {}", image);
      }
    } catch (Exception e) {
      log.error("Failed to delete by Exception. image : {}", image);
    }
  }
}
