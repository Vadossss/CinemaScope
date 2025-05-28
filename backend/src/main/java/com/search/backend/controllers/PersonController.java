package com.search.backend.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.search.backend.models.MovieMongo;
import com.search.backend.models.PersonMongo;
import com.search.backend.repositories.PersonRepositoryMongo;
import com.search.backend.services.PersonService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;

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
        for (int page = 6; page <= 15; page++) {
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

    @GetMapping("/getPersons")
    public Page<PersonMongo> getPersons(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return personRepository.findAll(pageable);
    }


}
