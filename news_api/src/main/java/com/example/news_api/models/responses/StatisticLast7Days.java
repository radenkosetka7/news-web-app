package com.example.news_api.models.responses;

import lombok.Data;

@Data
public class StatisticLast7Days {

    private String attribute;
    private String value;
    private Long totalVisits;
}
