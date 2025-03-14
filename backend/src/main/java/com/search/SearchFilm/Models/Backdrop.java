package com.search.SearchFilm.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "backdrops")
@Getter
@Setter
public class Backdrop {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;
    private String previewUrl;
}