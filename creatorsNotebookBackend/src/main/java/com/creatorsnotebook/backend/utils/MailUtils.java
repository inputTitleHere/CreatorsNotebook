package com.creatorsnotebook.backend.utils;

import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;

@Component
public class MailUtils {
  @Autowired
  private JavaMailSender emailSender;

  /**
   * 인증번호 발송을 위한 메일 형식을 생성한다.
   *
   * @param authString 인증번호
   * @param to         전송대상
   * @return MimeMessage객체 (메일전송객체)
   * @throws MessagingException           메세지 객체 생성오류
   * @throws UnsupportedEncodingException InternetAddress 생성오류
   */
  public MimeMessage createAuthStringMessage(String authString, String to) throws MessagingException, UnsupportedEncodingException {
    MimeMessage message = emailSender.createMimeMessage();
    message.setFrom(new InternetAddress("creatorsnotebook@naver.com","창작자의 노트북"));
    message.setRecipients(Message.RecipientType.TO, to);
    message.setSubject("[창작자의 노트북] 비밀번호 변경 인증 번호");
    String messageText = """
            <div style="display: flex;align-items: center;justify-content: enter;flex-direction: column;width: 100%;">
            <h1>창작자의 노트북</h1>
            <div style="border: 1px solid #8bc34a; padding: 24px; border-radius: 15px">
            비밀번호 변경을 위한 인증 번호를 보내드립니다.
            <div style="display: flex; align-items: center">
            <h3 style="margin-right: 25px">인증 번호 :</h3>
            <h2 style="padding: 12px;border: 1px solid #8bc34a;border-radius: 15px;">
            """
            + authString +
            """
                    </h2>
                    </div>
                    </div>
                    </div>
                    """;
    message.setText(messageText, "utf-8", "html");
    return message;
  }

  /**
   * 메일을 전송한다.
   * @param message 전송할 메일 메세지
   */
  public void sendMail(MimeMessage message){
    emailSender.send(message);
  }
}
