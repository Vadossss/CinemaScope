package com.search.backend;

import com.search.backend.models.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;


@SpringBootApplication
@EnableJpaRepositories(
		basePackages = "com.search.backend.repositories.jpa"
)
@EnableMongoRepositories(
		basePackages = "com.search.backend.repositories.mongo"
)
@EntityScan(basePackages = "com.search.backend.models")
@EnableConfigurationProperties(FileStorageProperties.class)
public class SearchFilmApplication {
	public static void main(String[] args) {
		SpringApplication.run(SearchFilmApplication.class, args);
	}
}
