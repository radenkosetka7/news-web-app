package com.example.news_api.models.responses;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class CommentResponse {

    private Integer id;
    private Integer newsId;
    private String user;
    private String content;
    private Date createdAt;
    private Integer parentCommentId;



}
