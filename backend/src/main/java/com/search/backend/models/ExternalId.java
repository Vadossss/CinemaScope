package com.search.backend.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "external_ids")
@Getter
@Setter
public class ExternalId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String kpHD;
    private Integer tmdb;
}
