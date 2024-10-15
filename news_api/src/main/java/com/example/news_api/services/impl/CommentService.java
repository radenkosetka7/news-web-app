package com.example.news_api.services.impl;

import com.example.news_api.models.entities.Comment;
import com.example.news_api.models.requests.CommentRequest;
import com.example.news_api.models.responses.CommentResponse;
import com.example.news_api.repositories.CommentRepository;
import com.example.news_api.services.ICommentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService implements ICommentService {

    private final CommentRepository commentRepository;
    private final ModelMapper modelMapper;

    @Override
    public CommentResponse insert(CommentRequest request) {
        Comment comment = modelMapper.map(request, Comment.class);
        comment.setCreatedAt(new Date());
        if (request.getParentCommentId() != null) {
            Comment parentComment = commentRepository.findById(request.getParentCommentId())
                    .orElseThrow(() -> new IllegalArgumentException("Parent comment not found"));
            comment.setParentComment(parentComment);
        }
        comment = commentRepository.saveAndFlush(comment);
        return modelMapper.map(comment, CommentResponse.class);
    }

    @Override
    public List<CommentResponse> getByNewsId(Integer id) {
        List<Comment> comments = commentRepository.findByNewsId(id);
        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentResponse.class))
                .collect(Collectors.toList());

    }


}
