package com.search.backend.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FindNameRequest {
    private String name;
    private Integer limit;
}
