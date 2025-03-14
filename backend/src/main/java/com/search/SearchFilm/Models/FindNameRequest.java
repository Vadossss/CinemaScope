package com.search.SearchFilm.Models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindNameRequest {
    private String name;
    private Integer limit;
}
