package com.example.news_api.services;

import com.example.news_api.models.requests.CommentRequest;
import com.example.news_api.models.responses.CommentResponse;
import com.example.news_api.models.responses.TopNewsResponse;

import java.util.List;

public interface ICommentService {

    CommentResponse insert(CommentRequest request);

    List<CommentResponse> getByNewsId(Integer id);

    List<TopNewsResponse> findTop10MostCommentedNews();
}
