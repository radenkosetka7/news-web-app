package com.example.news_api.services.impl;

import com.example.news_api.exceptions.NotFoundException;
import com.example.news_api.models.entities.Comment;
import com.example.news_api.models.requests.CommentRequest;
import com.example.news_api.models.responses.CommentResponse;
import com.example.news_api.models.responses.TopNewsResponse;
import com.example.news_api.repositories.CommentRepository;
import com.example.news_api.repositories.TopCommentRepository;
import com.example.news_api.services.ICommentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService implements ICommentService {

    private final CommentRepository commentRepository;
    private final TopCommentRepository topCommentRepository;
    private final ModelMapper modelMapper;

    @Override
    public CommentResponse insert(CommentRequest request) {
        Comment comment = modelMapper.map(request, Comment.class);
        comment.setCreatedAt(new Date());
        if (request.getParentCommentId() != null) {
            Comment parentComment = commentRepository.findById(request.getParentCommentId())
                    .orElseThrow(() -> new NotFoundException("Parent comment not found"));
            comment.setParentComment(parentComment);
        }
        return modelMapper.map(commentRepository.saveAndFlush(comment), CommentResponse.class);
    }


    @Override
    public Page<CommentResponse> getByNewsId(Integer id,Pageable pageable) {
        return commentRepository.findByNewsIdAndParentCommentIsNull(id,pageable)
                .map(comment-> modelMapper.map(comment, CommentResponse.class));
    }

    @Override
    public Page<CommentResponse> getByParentCommentId(Integer id, Pageable pageable) {
       return commentRepository.findByParentCommentId(id,pageable)
               .map(comment-> modelMapper.map(comment, CommentResponse.class));
    }


    @Override
    public List<TopNewsResponse> findTop10MostCommentedNews() {
        return topCommentRepository.findAll().stream().map(topComment -> modelMapper.map(topComment, TopNewsResponse.class)).collect(Collectors.toList());
    }

    @Override
    public Long getNewsCommentsCount(Integer id) {
        return commentRepository.getNewsCommentsCount(id);
    }


}
