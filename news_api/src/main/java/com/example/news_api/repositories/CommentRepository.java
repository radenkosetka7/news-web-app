package com.example.news_api.repositories;

import com.example.news_api.models.entities.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    Page<Comment> findByNewsIdAndParentCommentIsNull(Integer id, Pageable pageable);

    Page<Comment> findByParentCommentIdAndNewsId(Integer id, Integer newsId, Pageable pageable);

    @Query("select count(c) from Comment  c where c.newsId=:id")
    Long getNewsCommentsCount(Integer id);

    @Query("select count(c) from Comment  c where c.parentComment.id=:id")
    Long getParentNewsCommentsCount(Integer id);
}
