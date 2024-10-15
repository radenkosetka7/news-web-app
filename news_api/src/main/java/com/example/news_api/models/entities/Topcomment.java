package com.example.news_api.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "topcomments")
public class Topcomment {
    @Id
    @NotNull
    @Column(name = "news_id", nullable = false)
    private Integer newsId;

    @NotNull
    @Column(name = "total_comments", nullable = false)
    private Long totalComments;

}