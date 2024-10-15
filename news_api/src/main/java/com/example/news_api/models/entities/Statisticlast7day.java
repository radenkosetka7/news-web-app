package com.example.news_api.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Immutable;

/**
 * Mapping for DB view
 */
@Data
@Entity
@Immutable
@Table(name = "statisticlast7days")
public class Statisticlast7day {
    @Id
    @Size(max = 15)
    @NotNull
    @Column(name = "attribute", nullable = false, length = 15)
    private String attribute;

    @Size(max = 45)
    @Column(name = "value", length = 45)
    private String value;

    @NotNull
    @Column(name = "total_visits", nullable = false)
    private Long totalVisits;

}