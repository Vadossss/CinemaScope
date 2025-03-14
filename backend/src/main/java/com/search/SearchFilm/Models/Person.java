package com.search.SearchFilm.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Table(name = "persons")
@Entity
@Getter
@Setter
public class Person {
    @Id
    private Long id;
    private String photo;
    private String name;
    private String enName;
    private String description;
    private String profession;
    private String enProfession;
}
