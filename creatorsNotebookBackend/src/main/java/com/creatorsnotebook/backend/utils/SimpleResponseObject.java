package com.creatorsnotebook.backend.utils;

import lombok.*;

import java.io.Serializable;

@Builder
@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SimpleResponseObject implements Serializable {
    private Object data;
}
