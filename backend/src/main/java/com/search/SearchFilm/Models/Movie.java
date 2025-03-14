package com.search.SearchFilm.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "movies")
@Getter
@Setter
public class Movie {
    @Id
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "external_id")
    private ExternalId externalId;

    private String name;
    private String alternativeName;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movie_id")
    private List<MovieName> names;

    private String type;
    private Integer typeNumber;
    private Integer year;
    private String description;
    private String shortDescription;
    private String slogan;
    private String status;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rating_id")
    private Rating rating;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "votes_id")
    private Votes votes;

    private Integer movieLength;
    private Integer totalSeriesLength;
    private Integer seriesLength;
    private String ratingMpaa;
    private Integer ageRating;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "poster_id")
    private Poster poster;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "backdrop_id")
    private Backdrop backdrop;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movie_id")
    private List<Genre> genres;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movie_id")
    private List<Country> countries;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movie_id")
    private List<Person> persons;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "premiere_id")
    private Premiere premiere;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "watchability_id")
    private Watchability watchability;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movie_id")
    private List<ReleaseYear> releaseYears;

    private Integer top10;
    private Integer top250;
    private Boolean isSeries;
    private Boolean ticketsOnSale;

    @ElementCollection
    @CollectionTable(name = "movie_lists", joinColumns = @JoinColumn(name = "movie_id"))
    private List<String> lists;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "networks_id")
    private Networks networks;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "movie_id")
    private List<SeasonInfo> seasonsInfo;

    private Boolean isTmdbChecked;

    // Getters and Setters
}
