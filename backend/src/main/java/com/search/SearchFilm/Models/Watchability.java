package com.search.SearchFilm.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;



@Entity
@Table(name = "watchability")
@Getter
@Setter
public class Watchability {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "watchability_id")
    private List<WatchabilityItem> items;
}
