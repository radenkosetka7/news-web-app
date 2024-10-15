package com.example.news_api.services;

import com.example.news_api.models.requests.CommentRequest;
import com.example.news_api.models.responses.CommentResponse;

import java.util.List;

public interface ICommentService {

    CommentResponse insert(CommentRequest request);

    List<CommentResponse> getByNewsId(Integer id);
}
