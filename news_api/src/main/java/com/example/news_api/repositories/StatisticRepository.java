package com.example.news_api.repositories;

import com.example.news_api.models.entities.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatisticRepository extends JpaRepository<Statistic, Integer> {

}
