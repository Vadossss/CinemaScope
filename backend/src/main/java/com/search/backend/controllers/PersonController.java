package com.search.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.search.backend.models.MovieMongo;
import com.search.backend.models.PersonMongo;
import com.search.backend.repositories.PersonRepositoryMongo;
import com.search.backend.services.PersonService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
@RequestMapping("/person")
public class PersonController {

    private final PersonService personService;
    private final PersonRepositoryMongo personRepository;

    public PersonController(PersonService personService, PersonRepositoryMongo personRepository) {
        this.personService = personService;
        this.personRepository = personRepository;
    }


    @GetMapping("/save")
    public void saveExampleMovie() throws IOException {
        for (int page = 5; page <= 250; page++) {
            String jo = personService.getPersons(page);
            JsonNode js = (new ObjectMapper()).readTree(jo);
            for (JsonNode j : js.path("docs")) {
                try {
                    ObjectMapper objectMapper = new ObjectMapper();
                    PersonMongo person = objectMapper.readValue(j.toString(), PersonMongo.class);
                    personRepository.save(person);
                } catch (Exception e) {
                    throw new IOException(e.getMessage());
                }
            }
        }
    }
}
