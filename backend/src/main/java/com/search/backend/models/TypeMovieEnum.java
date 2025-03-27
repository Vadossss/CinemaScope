package com.search.backend.models;

import lombok.Getter;

/**
 * Перечисление, представляющее типы фильмов.
 * Каждый тип имеет два представления: на русском и английском языке.
 */
@Getter
public enum TypeMovieEnum {

    /**
     * Тип "фильм".
     * Русское название: "фильм", английское название: "movie".
     */
    MOVIE("фильм", "movie"),

    /**
     * Тип "сериал".
     * Русское название: "сериал", английское название: "tv-series".
     */
    SERIES("сериал", "tv-series"),

    /**
     * Тип "мультсериал".
     * Русское название: "мультфильм", английское название: "animated-series".
     */
    ANIMATEDSERIES("мультфильм", "animated-series"),

    /**
     * Тип "аниме".
     * Русское название: "Аниме", английское название: "anime".
     */
    ANIME("Аниме", "anime"),

    /**
     * Тип "мультфильм".
     * Русское название: "мультфильм", английское название: "cartoon".
     */
    CARTOON("мультфильм", "cartoon");


    private final String typeElementRus;
    private final String typeElementEng;

    /**
     * Конструктор для инициализации значений типа элемента на русском и английском языках.
     *
     * @param typeElementRus тип элемента на русском языке
     * @param typeElementEng тип элемента на английском языке
     */
    TypeMovieEnum(String typeElementRus, String typeElementEng) {
        this.typeElementRus = typeElementRus;
        this.typeElementEng = typeElementEng;
    }

    /**
     * Получить тип фильма по русскому названию.
     * Если совпадение найдено, возвращает соответствующий элемент перечисления.
     *
     * @param typeElementRus русский тип фильма
     * @return соответствующий тип фильма из перечисления или null, если тип не найден
     */
    public static TypeMovieEnum getTypeMovieEnum(String typeElementRus) {
        for (TypeMovieEnum typeMovieEnum : TypeMovieEnum.values()) {
            if (typeMovieEnum.getTypeElementRus().equals(typeElementRus)) {
                return typeMovieEnum;
            }
        }
        return null;
    }
}
