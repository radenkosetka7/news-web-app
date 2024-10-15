package com.example.news_api.services;

import com.example.news_api.models.requests.StatisticRequest;
import com.example.news_api.models.responses.StatisticResponse;

import java.util.Date;
import java.util.List;

public interface IStatisticService {

    StatisticResponse insert(StatisticRequest request);
    List<StatisticResponse> findLastWeekStatistics();
}
