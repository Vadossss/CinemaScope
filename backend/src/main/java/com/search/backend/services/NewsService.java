package com.search.backend.services;

import ch.qos.logback.core.net.server.Client;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class NewsService {

    @Value("${NEWS_API_KEY}")
    private String newsApiKey;

    private final MongoTemplate mongoTemplate;

    public NewsService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public String getNews(int page) throws IOException {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
                .url(String.format("https://kinopoiskapiunofficial.tech/api/v1/media_posts?page=%d",page))
                .get()
                .addHeader("accept", "application/json")
                .addHeader("X-API-KEY", newsApiKey)
                .build();
        Response response;
        try {
            response = client.newCall(request).execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return response.body().string();



    }

}
