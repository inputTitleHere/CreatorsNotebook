package com.creatorsnotebook.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class TestController {
  @GetMapping("/ping")
  public ResponseEntity<?> ping(){
    return ResponseEntity.ok(null);
  }
}
