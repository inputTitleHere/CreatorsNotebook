package com.creatorsnotebook.backend.model.entity;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CharacterAttribute {
  String name;
  String type;
  Object value;

  public CharacterAttribute(Map<String,String> map){
    this.name=map.get("name");
    this.type=map.get("type");
    this.value=map.get("value");
  }

}
