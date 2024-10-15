package com.example.news_api.repositories;

import com.example.news_api.models.entities.Topcomment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopCommentRepository extends JpaRepository<Topcomment, Integer> {

}
