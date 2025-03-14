package com.search.backend.models;

import java.util.ArrayList;

public class SearchRequest {
    private ArrayList<String> genresList;
    private double ratingLow;
    private double ratingTop;

    public ArrayList<String> getGenresList() {
        return genresList;
    }

    public double getRatingLow() {
        return this.ratingLow;
    }

    public double getRatingTop() {
        return this.ratingTop;
    }

    public void setGenresList(ArrayList<String> genresList) {
        this.genresList = genresList;
    }

    public void setRatingLow(double ratingLow) {
        this.ratingLow = ratingLow;
    }

    public void setRatingTop(double ratingTop) {
        this.ratingTop = ratingTop;
    }
}
