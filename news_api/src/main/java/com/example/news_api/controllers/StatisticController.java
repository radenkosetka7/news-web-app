package com.example.news_api.controllers;

import com.example.news_api.models.requests.StatisticRequest;
import com.example.news_api.models.responses.StatisticLast7Days;
import com.example.news_api.models.responses.StatisticResponse;
import com.example.news_api.services.IStatisticService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/statistics")
@RequiredArgsConstructor
public class StatisticController {

    private final IStatisticService statisticService;

    @PostMapping
    public StatisticResponse insert(@RequestBody @Valid StatisticRequest request) {
        return statisticService.insert(request);
    }

    @GetMapping("/last-week")
    public List<StatisticLast7Days> findLastWeekStatistics() {
        return statisticService.findLastWeekStatistics();
    }
}
