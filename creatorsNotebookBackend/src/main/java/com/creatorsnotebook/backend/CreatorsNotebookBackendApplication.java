package com.creatorsnotebook.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EntityScan(basePackages = {"com.creatorsnotebook.backend.model.entity"})
public class CreatorsNotebookBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CreatorsNotebookBackendApplication.class, args);
	}

}
