package com.search.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jdk.jfr.Name;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Класс для работы с Персонами.
 */
@Getter
@Setter
@Document(collection = "persons")
@JsonIgnoreProperties(ignoreUnknown = true)

public class PersonMongo {
    @Id
    private Long id;
    @Field(write = Field.Write.ALWAYS)
    private String name;
    @Field(write = Field.Write.ALWAYS)
    private String enName;
    @Field(write = Field.Write.ALWAYS)
    private String photo;
    @Field(write = Field.Write.ALWAYS)
    private String sex;
    @Field(write = Field.Write.ALWAYS)
    private String growth;
    @Field(write = Field.Write.ALWAYS)
    private String birthday;
    @Field(write = Field.Write.ALWAYS)
    private String death;
    @Field(write = Field.Write.ALWAYS)
    private String age;
    @Field(write = Field.Write.ALWAYS)
    private List<BirthPlace> birthPlace;
    @Field(write = Field.Write.ALWAYS)
    private List<DeathPlace> deathPlace;
    @Field(write = Field.Write.ALWAYS)
    private List<Spouse> spouses;
    @Field(write = Field.Write.ALWAYS)
    private String countAwards;
    @Field(write = Field.Write.ALWAYS)
    private List<Profession> profession;
    @Field(write = Field.Write.ALWAYS)
    private List<Fact> facts;
    @Field(write = Field.Write.ALWAYS)
    private List<Movie> movies;


    @Getter
    @Setter
    public static class Movie {
        private int id;
        private String name;
        private String alternativeName;
        private Double rating;
        private boolean general;
        private String description;
        private String enProfession;
    }

    @Getter
    @Setter
    public static class BirthPlace {
        private String value;
    }
    @Getter
    @Setter
    public static class DeathPlace {
        private String value;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Spouse {
        private int id;
        private String name;
        private boolean divorced;
        private int children;
        private String relation;
    }

    @Getter
    @Setter
    public static class Profession {
        private String value;
    }

    @Getter
    @Setter
    public static class Fact {
        private String value;
    }


}
