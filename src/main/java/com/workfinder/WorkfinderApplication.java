package com.workfinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class WorkfinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorkfinderApplication.class, args);
	}

}
