package com.example.news_api.models.responses;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Data
public class StatisticResponse {

    private Integer id;
    private Date accessDate;
    private String ipAddress;
    private String browserName;
    private String osName;
    private String country;
    private String city;
    private String sectionName;
    private String subsectionName;
    private String newsTitle;
}
