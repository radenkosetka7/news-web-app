package com.example.news_api.models.responses;

import lombok.Data;

@Data
public class TopNewsResponse {
    private Integer newsId;
    private Long totalComments;
}
