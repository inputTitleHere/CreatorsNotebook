package com.creatorsnotebook.backend.model.dto;

import lombok.*;


@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponseDto {
    private UserDto user;
    private String jwt;
}
