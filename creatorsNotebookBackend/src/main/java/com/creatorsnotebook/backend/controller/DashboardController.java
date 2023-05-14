package com.creatorsnotebook.backend.controller;

import com.creatorsnotebook.backend.utils.SimpleResponseObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@Slf4j
public class DashboardController {

  @GetMapping("/test")
  public ResponseEntity<?> AuthTest(){
    log.info("Dashboard Test Code working");
    return ResponseEntity.ok(SimpleResponseObject.builder().data("working").build());
  }
}
