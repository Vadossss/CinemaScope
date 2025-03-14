package com.search.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@EnableKafka
@SpringBootApplication
public class SearchFilmApplication {

//	@KafkaListener(topics="msg")
//	public void msgListener(String msg){
//		System.out.println(msg);
//	}


	public static void main(String[] args) {
		SpringApplication.run(SearchFilmApplication.class, args);
	}

}
