package com.example.news_api.repositories;

import com.example.news_api.models.entities.Statistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface StatisticRepository extends JpaRepository<Statistic, Integer> {

    @Query("SELECT s FROM Statistic s WHERE s.accessDate>=:date")
    List<Statistic> findLastWeekStatistics(@Param("date")Date date);
}
