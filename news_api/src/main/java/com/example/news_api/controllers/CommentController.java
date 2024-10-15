package com.example.news_api.controllers;

import com.example.news_api.models.requests.CommentRequest;
import com.example.news_api.models.responses.CommentResponse;
import com.example.news_api.services.ICommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/comments")
@RequiredArgsConstructor
public class CommentController {

    private final ICommentService commentService;

    @PostMapping
    public CommentResponse insert(@RequestBody @Valid CommentRequest request) {
        return commentService.insert(request);
    }

    @GetMapping("/{id}")
    public List<CommentResponse> getByNewsId(@PathVariable Integer id) {
        return commentService.getByNewsId(id);
    }
}
