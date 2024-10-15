package com.example.news_api.services.impl;

import com.example.news_api.models.entities.Statistic;
import com.example.news_api.models.requests.StatisticRequest;
import com.example.news_api.models.responses.StatisticLast7Days;
import com.example.news_api.models.responses.StatisticResponse;
import com.example.news_api.repositories.StatisticLast7DaysRepository;
import com.example.news_api.repositories.StatisticRepository;
import com.example.news_api.services.IStatisticService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class StatisticService implements IStatisticService {

    private final StatisticRepository statisticRepository;
    private final StatisticLast7DaysRepository statisticLast7DaysRepository;
    private final ModelMapper modelMapper;

    @Override
    public StatisticResponse insert(StatisticRequest request) {
        Statistic statistic = modelMapper.map(request, Statistic.class);
        statistic.setAccessDate(new Date());
        return modelMapper.map(statisticRepository.saveAndFlush(statistic), StatisticResponse.class);
    }

    @Override
    public List<StatisticLast7Days> findLastWeekStatistics() {
        return statisticLast7DaysRepository.findAll()
                .stream().map(s->modelMapper.map(s,StatisticLast7Days.class))
                .collect(Collectors.toList());
    }
}
