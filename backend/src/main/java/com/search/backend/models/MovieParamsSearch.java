package com.search.backend.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Класс для универсального поиска элементов (фильм/сериал)
 */
@Getter
@Setter
public class MovieParamsSearch {
    private Long id;
    private Integer limit;
    private List<String> types;
    private Boolean isSeries;
    private List<String> status;
    private Integer year;
    private Integer releaseYearsStart;
    private Integer releaseYearsEnd;
    private String ratingKp;
    private String ratingImdb;
    private String ratingOwn;
    private String ratingMpaa;
    private Integer ageRating;
    private String votesKp;
    private String votesImdb;
    private String votesOwn;
    private String movieLength;
    private List<String> genres;
    private List<String> countries;
}
