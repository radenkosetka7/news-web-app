package com.example.news_api.models.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class CommentRequest {

    @NotNull(message = "News identifier cannot be null")
    @Positive(message = "News identifier cannot be negative number or zero")
    private Integer newsId;

    @NotBlank(message = "User cannot be blank")
    private String user;

    @NotBlank(message = "Content cannot be blank")
    private String content;

    @Positive(message = "Parent comment identifier cannot be negative number or zero")
    private Integer parentCommentId;

}
