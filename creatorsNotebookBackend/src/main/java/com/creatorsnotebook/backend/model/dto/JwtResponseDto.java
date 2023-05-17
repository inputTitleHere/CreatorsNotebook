package com.creatorsnotebook.backend.model.dto;

import lombok.*;


/**
 * 로그인시 React-Redux에 보관할 <strong>사용자 정보</strong>와 더불어 <strong>JWT</strong>를 전송할 DTO객체이다.
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponseDto {
    private UserDto user;
    private String jwt;
}
