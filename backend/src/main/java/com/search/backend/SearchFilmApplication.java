package com.search.backend;

import com.search.backend.models.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties(FileStorageProperties.class)
public class SearchFilmApplication {
	public static void main(String[] args) {
		SpringApplication.run(SearchFilmApplication.class, args);
	}
}
