package com.search.SearchFilm.Models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "movies")
@JsonIgnoreProperties(ignoreUnknown = true)
public class MovieModel {
    @Id
    private Long movieId;

//    private String name;
//    private String alternativeName;
//    private String enName;
//    private String type;
//    private Integer typeNumber;
//    private int year;
//    @Column(columnDefinition = "TEXT")
//    private String description;
//    private String shortDescription;
//    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "movie_id")
//    private Rating rating;
//    private int movieLength;
//    private boolean isSeries;
//    private String ratingMpaa;
//    private int ageRating;
//
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "movie_id")
//    private List<Genree> genres;
//
//    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
//    @JoinColumn(name = "movie_id")
//    private List<Country> countries;
//
//    public void setRating(Rating rating) {
//        this.rating = rating;
//    }
//
//    public void setId(Long movieId) {
//        this.movieId = movieId;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public void setAlternativeName(String alternativeName) {
//        this.alternativeName = alternativeName;
//    }
//
//    public void setEnName(String enName) {
//        this.enName = enName;
//    }
//
//    public void setType(String type) {
//        this.type = type;
//    }
//
//    public void setYear(int year) {
//        this.year = year;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public void setShortDescription(String shortDescription) {
//        this.shortDescription = shortDescription;
//    }
//
//    public void setMovieLength(int movieLength) {
//        this.movieLength = movieLength;
//    }
//
//    public void setSeries(boolean isSeries) {
//        this.isSeries = isSeries;
//    }
//
//    public void setRatingMpaa(String ratingMpaa) {
//        this.ratingMpaa = ratingMpaa;
//    }
//
//    public void setAgeRating(int ageRating) {
//        this.ageRating = ageRating;
//    }
//
//    public void setGenres(List<Genre> genres) {
//        this.genres = genres;
//    }
//
//    public void setCountries(List<Country> countries) {
//        this.countries = countries;
//    }
//
//    public Long getId() {
//        return this.movieId;
//    }
//
//    public String getName() {
//        return this.name;
//    }
//
//    public String getAlternativeName() {
//        return this.alternativeName;
//    }
//
//    public String getEnName() {
//        return this.enName;
//    }
//
//    public String getType() {
//        return this.type;
//    }
//
//    public Rating getRating() {
//        return this.rating;
//    }
//
//    public int getYear() {
//        return this.year;
//    }
//
//    public String getDescription() {
//        return this.description;
//    }
//
//    public String getShortDescription() {
//        return this.shortDescription;
//    }
//
//    public int getMovieLength() {
//        return this.movieLength;
//    }
//
//    public boolean isSeries() {
//        return this.isSeries;
//    }
//
//    public String getRatingMpaa() {
//        return this.ratingMpaa;
//    }
//
//    public int getAgeRating() {
//        return this.ageRating;
//    }
//
//    public List<Genre> getGenres() {
//        return this.genres;
//    }
//
//    public List<Country> getCountries() {
//        return this.countries;
//    }
}

//@Entity
//@JsonIgnoreProperties(ignoreUnknown = true)
//@Table(name = "rating")
//class Rating {
//    @Id
//    private Long movie_id;
//
//    private Double kp_rating;
//    private Double imdb_rating;
//
//    @OneToOne
//    @MapsId
//    @JoinColumn(name = "movie_id")
//    private MovieModel movie;
//
//    public void setMovie_id(Long movie_id) {
//        this.movie_id = movie_id;
//    }
//
//    public void setKp_rating(Double kp_rating) {
//        this.kp_rating = kp_rating;
//    }
//
//    public void setImdb_rating(Double imdb_rating) {
//        this.imdb_rating = imdb_rating;
//    }
//
////    public void setMovie(MovieModel movie) {
////        this.movie = movie;
////    }
//
//    public Long getMovie_id() {
//        return this.movie_id;
//    }
//
//    public Double getKp_rating() {
//        return this.kp_rating;
//    }
//
//    public Double getImdb_rating() {
//        return this.imdb_rating;
//    }
//
////    public MovieModel getMovie() {
////        return this.movie;
////    }
//}
//
//@Entity
//@Table(name = "genres")
//class Genree {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String name;
//
//    public Long getId() {
//        return this.id;
//    }
//
//    public String getName() {
//        return this.name;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//    // Геттеры и сеттеры
//}
//
//@Entity
//@Table(name = "countries")
//class Country {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//    private String name;
//
//    public Long getId() {
//        return this.id;
//    }
//
//    public String getName() {
//        return this.name;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//    // Геттеры и сеттеры
//}
