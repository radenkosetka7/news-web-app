package com.example.news_api.repositories;

import com.example.news_api.models.entities.Statisticlast7day;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatisticLast7DaysRepository extends JpaRepository<Statisticlast7day,String> {
}
