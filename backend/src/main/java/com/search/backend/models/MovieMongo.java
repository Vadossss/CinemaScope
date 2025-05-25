package com.search.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.*;

/**
 * Класс для работы с элементом (фильма/сериала).
 */
@Getter
@Setter
@Document(collection = "movies")
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieMongo {

    @Id
    private Long id;

    private String name;
    @Field(write = Field.Write.ALWAYS)
    private String alternativeName;
    @Field(write = Field.Write.ALWAYS)
    private String enName;
    private String type;
    private Integer typeNumber;
    private Integer year;
    @Field(write = Field.Write.ALWAYS)
    private String description;
    @Field(write = Field.Write.ALWAYS)
    private String shortDescription;
    @Field(write = Field.Write.ALWAYS)
    private String slogan;
    @Field(write = Field.Write.ALWAYS)
    private String status;
    private Rating rating;
    private Votes votes;
    @Field(write = Field.Write.ALWAYS)
    private Integer movieLength;
    @Field(write = Field.Write.ALWAYS)
    private Integer totalSeriesLength;
    @Field(write = Field.Write.ALWAYS)
    private Integer seriesLength;
    @Field(write = Field.Write.ALWAYS)
    private String ratingMpaa;
    @Field(write = Field.Write.ALWAYS)
    private Integer ageRating;
    @Field(write = Field.Write.ALWAYS)
    private List<Genre> genres;
    private List<Country> countries;
    private List<Persona> persons;
    @Field(write = Field.Write.ALWAYS)
    private Integer top10;
    @Field(write = Field.Write.ALWAYS)
    private Integer top250;
    @Field(write = Field.Write.ALWAYS)
    private Boolean isSeries;
    @Field(write = Field.Write.ALWAYS)
    private Boolean ticketsOnSale;
    @Field(write = Field.Write.ALWAYS)
    private String createdAt;
    @Field(write = Field.Write.ALWAYS)
    private String updatedAt;

    @Field(write = Field.Write.ALWAYS)
    private Poster poster;

    @Field(write = Field.Write.ALWAYS)
    private WatchAbility watchability;

    @Field(write = Field.Write.ALWAYS)
    private Map<String, FeeEntry> fees;

    @Field(write = Field.Write.ALWAYS)
    private Map<String, String> premiere;

    @Field(write = Field.Write.ALWAYS)
    private Budget budget;

    @Field(write = Field.Write.ALWAYS)
    private List<SequelsAndPrequelsItem> sequelsAndPrequels;

    private List<SimilarMoviesItem> similarMovies;

    private List<AudienceItem> audience;

    private Videos videos;
    private double popularity;
    private String trailer;

    @Getter
    @Setter
    public static class Videos {
        @Field(write = Field.Write.ALWAYS)
        private List<VideoItem> trailers;
    }

    @Getter
    @Setter
    public static class VideoItem {
        private String url;
        private String name;
        private String site;
        private String type;
    }

    @Getter
    @Setter
    public static class AudienceItem {
        private Long count;
        private String country;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    @Getter
    @Setter
    public static class SimilarMoviesItem {
        private Long id;
    }

    @Getter
    @Setter
    public static class SequelsAndPrequelsItem {
        @Field(write = Field.Write.ALWAYS)
        private Long id;
        @Field(write = Field.Write.ALWAYS)
        private String name;
        @Field(write = Field.Write.ALWAYS)
        private String alternativeName;
        @Field(write = Field.Write.ALWAYS)
        private String enName;
        @Field(write = Field.Write.ALWAYS)
        private String type;
        @Field(write = Field.Write.ALWAYS)
        private Poster poster;
        @Field(write = Field.Write.ALWAYS)
        private WatchAbility watchability;
        @Field(write = Field.Write.ALWAYS)
        private Rating rating;
        @Field(write = Field.Write.ALWAYS)
        private Integer year;
    }


    @Getter
    @Setter
    public static class FeeEntry {
        private long value;
        private String currency;
    }

    @Getter
    @Setter
    public static class Budget {
        private long value;
        private String currency;
    }

    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Rating {
        private Double kp;
        private Double imdb;
        @Field(write = Field.Write.ALWAYS)
        private Double rate = 0.0;
    }
    @Getter
    @Setter
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Votes {
        private Integer kp;
        private Integer imdb;
        @Field(write = Field.Write.ALWAYS)
        private Integer vote = 0;
    }
    @Getter
    @Setter
    public static class Genre {
        private String name;
    }
    @Getter
    @Setter
    public static class Country {
        private String name;
    }

    @Getter
    @Setter
    public static class Persona {
        private Long id;
        private String photo;
        private String name;
        private String enName;
        private String description;
        private String profession;
        private String enProfession;
    }

    @Getter
    @Setter
    public static class WatchAbility {
        private List<Item> items;
    }

    @Getter
    @Setter
    public static class Item {
        private String name;
        private Logo logo;
        private String url;

        @Getter
        @Setter
        public static class Logo {
            private String url;

        }
    }


    @Getter
    @Setter
    public static class Poster {
        private String previewUrl;
        private String url;
    }
}
