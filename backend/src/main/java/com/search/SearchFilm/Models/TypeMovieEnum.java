package com.search.SearchFilm.Models;

import lombok.Getter;

@Getter
public enum TypeMovieEnum {
    MOVIE("фильм", "movie"),
    SERIES("сериал", "tv-series"),
    ANIMATEDSERIES("мультфильм", "animated-series"),
    ANIME("Аниме", "anime"),
    CARTOON("мультфильм", "cartoon");


    private final String TypeElementRus;
    private final String TypeElementEng;


    TypeMovieEnum(String typeElementRus, String typeElementEng) {
        TypeElementRus = typeElementRus;
        TypeElementEng = typeElementEng;
    }

    public static TypeMovieEnum getTypeMovieEnum(String typeElementRus) {
        for (TypeMovieEnum typeMovieEnum : TypeMovieEnum.values()) {
            if (typeMovieEnum.getTypeElementRus().equals(typeElementRus)) {
                return typeMovieEnum;
            }
        }
        return null;
    }
}
