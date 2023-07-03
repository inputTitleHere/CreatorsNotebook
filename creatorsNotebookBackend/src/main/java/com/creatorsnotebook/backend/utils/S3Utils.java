/**
 * Amazon S3 Bucket과 관련된 유틸리티 함수들을 모아둔다.
 */
package com.creatorsnotebook.backend.utils;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Component
public class S3Utils {
  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  @Autowired
  private AmazonS3Client amazonS3Client;

  /**
   * AWS S3으로 파일을 업로드한다.
   *
   * @param file 파일 객체
   */
  public void uploadToS3(String fileName, MultipartFile file) throws IOException {
    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentLength(file.getSize());
    metadata.setContentType(file.getContentType());
    amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
  }

  public void deleteFromS3(String filename) {
    amazonS3Client.deleteObject(bucket, filename);
  }

}
