package com.example.news_api.models.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "statistics")
public class Statistic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "access_date", nullable = false)
    private Date accessDate;

    @Column(name = "ip_address", nullable = false, length = 45)
    private String ipAddress;

    @Column(name = "browser_name", nullable = false, length = 45)
    private String browserName;

    @Column(name = "os_name", nullable = false, length = 45)
    private String osName;

    @Column(name = "country", nullable = false, length = 45)
    private String country;

    @Column(name = "city", nullable = false, length = 45)
    private String city;

    @Column(name = "section_name", nullable = false, length = 45)
    private String sectionName;

    @Column(name = "subsection_name", nullable = false, length = 45)
    private String subsectionName;

    @Column(name = "news_title", length = 45)
    private String newsTitle;

}