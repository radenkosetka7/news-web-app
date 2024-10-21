package com.example.news_api.models.responses;

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
