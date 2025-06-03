package com.search.backend.services;

import com.search.backend.models.MovieMongo;
import com.search.backend.models.PersonMongo;
import com.search.backend.repositories.UserMongoRepository;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PersonService {
    @Value("${KINO_API_KEY}")
    private String kinoApiKey;
    private final MongoTemplate mongoTemplate;

    public PersonService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }


    public String getPersons(int page) throws IOException {
        OkHttpClient client = new OkHttpClient();

        Request request = new Request.Builder()
//                .url("https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&selectFields=&type=movie&rating.kp=7-10")
                .url(String.format("https://api.kinopoisk.dev/v1.4/person?page=%d&limit=250&selectFields=id&selectFields=name&" +
                        "selectFields=enName&selectFields=photo&selectFields=sex&selectFields=growth&selectFields=birthday" +
                        "&selectFields=death&selectFields=age&selectFields=birthPlace&selectFields=deathPlace&selectFields=spouses" +
                        "&selectFields=countAwards&selectFields=profession&selectFields=facts&selectFields=movies", page))
                .get()
                .addHeader("accept", "application/json")
                .addHeader("X-API-KEY", kinoApiKey)
                .build();

        Response response;
        try {
            response = client.newCall(request).execute();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return response.body().string();
    }

    public ResponseEntity<Object> getPersonByID(Long id) {
        PersonMongo person = mongoTemplate.findById(id, PersonMongo.class);
        if (person == null) {
            return ResponseEntity.status(404).body("Person not found");
        }
        return ResponseEntity.ok(person);
    }

    public List<PersonMongo> searchByNameRegex(String name, int limit) {
        Criteria criteria = Criteria.where("name").regex(name, "i");
        Query query = new Query(criteria).limit(limit);
        return mongoTemplate.find(query, PersonMongo.class);
    }
}
