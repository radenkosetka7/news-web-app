package com.example.news_api.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

/**
 * Mapping for DB view
 */
@Getter
@Setter
@Entity
@Immutable
@Table(name = "statisticlast7days")
public class Statisticlast7day {
    @Id
    @NotNull
    @Column(name = "id", nullable = false)
    private Long id;

    @Size(max = 26)
    @NotNull
    @Column(name = "attribute", nullable = false, length = 26)
    private String attribute;

    @Size(max = 255)
    @Column(name = "value")
    private String value;

    @NotNull
    @Column(name = "total_visits", nullable = false)
    private Long totalVisits;

}