package com.search.backend.models;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.Date;
import java.util.*;


@Getter
@Setter
@Document(collection = "news")
@JsonIgnoreProperties(ignoreUnknown = true)

public class NewsMongo {

    @Id
    private Long kinopoiskId;

    @Field(write = Field.Write.ALWAYS)
    private String imageUrl;

    @Field(write= Field.Write.ALWAYS)
    private String title;

    @Field(write = Field.Write.ALWAYS)
    private String description;

    @Field(write = Field.Write.ALWAYS)
    private String url;

    @Field(write = Field.Write.ALWAYS)
    private Date publishedAt;
}
