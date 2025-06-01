package com.search.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.search.backend.models.NewsMongo;
import com.search.backend.models.PersonMongo;
import com.search.backend.repositories.NewsRepositoryMongo;
import com.search.backend.services.NewsService;
import lombok.Builder;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/news")
public class NewsController {

    private final NewsService newsService;
    private final NewsRepositoryMongo newsRepository;

    public NewsController(NewsService newsService, NewsRepositoryMongo newsRepository) {
        this.newsService = newsService;
        this.newsRepository = newsRepository;
    }

    @GetMapping("/save")
    public void saveNewsExample() throws IOException {
        for (int page = 1; page <= 98; page++) {
            String jo = newsService.getNews(page);
            JsonNode js = (new ObjectMapper()).readTree(jo);
            for (JsonNode j : js.path("items")) {
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    NewsMongo news = objectMapper.readValue(j.toString(), NewsMongo.class);
                    newsRepository.save(news);
                } catch (Exception e) {
                    throw new IOException(e.getMessage());
                }
            }
        }
    }
    @GetMapping("/getNews")
    public Page<NewsMongo> getNews(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "desc") String sortDirection // по умолчанию по убыванию
    ) {
        Sort.Direction direction = Sort.Direction.fromOptionalString(sortDirection.toUpperCase()).orElse(Sort.Direction.DESC);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, "publishedAt"));
        return newsRepository.findAll(pageable);
    }

}
