package com.example.news_api.services;

import com.example.news_api.models.requests.CommentRequest;
import com.example.news_api.models.responses.CommentResponse;
import com.example.news_api.models.responses.TopNewsResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ICommentService {

    CommentResponse insert(CommentRequest request);

    Page<CommentResponse> getByNewsId(Integer id, Pageable pageable);

    Page<CommentResponse> getByParentCommentId(Integer id, Integer newsId, Pageable pageable);

    List<TopNewsResponse> findTop10MostCommentedNews();

    Long getNewsCommentsCount(Integer id);

    Long getParentNewsCommentsCount(Integer id);
}
