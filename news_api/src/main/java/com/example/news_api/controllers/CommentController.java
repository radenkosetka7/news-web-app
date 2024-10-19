package com.example.news_api.controllers;

import com.example.news_api.models.requests.CommentRequest;
import com.example.news_api.models.responses.CommentResponse;
import com.example.news_api.models.responses.TopNewsResponse;
import com.example.news_api.services.ICommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public Page<CommentResponse> getByNewsId(@PathVariable Integer id, @RequestParam(defaultValue = "0") int page,
                                             @RequestParam(defaultValue = "20") int size)
    {
        Pageable pageable = PageRequest.of(page, size);
        return commentService.getByNewsId(id,pageable);
    }

    @GetMapping("/childs/{id}")
    public Page<CommentResponse> getByParentId(@PathVariable Integer id, @RequestParam(defaultValue = "0") int page,
                                               @RequestParam(defaultValue = "20") int size)
    {
        Pageable pageable = PageRequest.of(page, size);
        return commentService.getByParentCommentId(id,pageable);
    }

    @GetMapping("/top-news")
    public List<TopNewsResponse> findTop10MostCommentedNews()
    {
        return commentService.findTop10MostCommentedNews();
    }

    @GetMapping("/count/{id}")
    public Long getNewsCommentsCount(@PathVariable Integer id)
    {
        return commentService.getNewsCommentsCount(id);
    }
}
