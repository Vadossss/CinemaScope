package com.search.SearchFilm.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "watchability_items")
@Getter
@Setter
public class WatchabilityItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "logo_id")
    private Logo logo;

    private String url;
}
