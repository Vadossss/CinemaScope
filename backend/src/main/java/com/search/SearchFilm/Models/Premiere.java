package com.search.SearchFilm.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name = "premieres")
@Getter
@Setter
public class Premiere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String country;
    private String world;
    private String russia;
    private String cinema;
    private String bluray;
    private String dvd;
    private LocalDateTime digital;
}
