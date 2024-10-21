import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import baseService from "../services/base.service";
import {API_URL} from "../util/helpers";


export const getAllNewsComments = createAsyncThunk("comments/getAllNewsComments", async ({id, page, size}) => {
    return baseService
        .get(API_URL+`api/v1/comments/${id}`, {
            params: {
                page: page,
                size: size
            }
        })
        .then((results) => results.data);
});

export const getCommentReplies = createAsyncThunk("comments/getCommnetReplies", async ({id, page, size, newsId}) => {
    return baseService
        .get(API_URL + `api/v1/comments/childs/${id}/${newsId}`, {
            params: {
                page: page,
                size: size
            }
        })
        .then((results) => results.data);
});

export const getNewsCommentsCount = createAsyncThunk("comments/getNewsCommentsCount", async (id) => {
    return baseService
        .get(API_URL + `api/v1/comments/count/${id}`)
        .then((results) => results.data);
});

export const getCommentRepliesCount = createAsyncThunk("comments/getCommentRepliesCount", async (id) => {
    return baseService
        .get(API_URL + `api/v1/comments/parent/count/${id}`)
        .then((results) => results.data);
});

export const addComment = createAsyncThunk("comments/postComment", async (data) => {
    return baseService
        .post(API_URL+ `api/v1/comments`, data)
        .then((results) => results.data);
});

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        newsComments: [],
        commentReplies: {},
        commentsCount: 0,
        repliesCount: 0,
        status: 'idle',
        error: null,

    },
    reducers: {
        removeCommentReplies: (state, action) => {
            const {id} = action.payload;
            delete state.commentReplies[id];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNewsComments.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllNewsComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.newsComments = action.payload.content
            })
            .addCase(getAllNewsComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getCommentReplies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCommentReplies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const {content} = action.payload;
                let parentCommentId = content[0]?.parentCommentId;
                if (parentCommentId) {
                    if (state.commentReplies[parentCommentId]) {
                        state.commentReplies[parentCommentId] = [
                            ...state.commentReplies[parentCommentId],
                            ...content
                        ];
                    } else {
                        state.commentReplies[parentCommentId] = content;
                    }
                }
            })
            .addCase(getCommentReplies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getNewsCommentsCount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getNewsCommentsCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.commentsCount = action.payload
            })
            .addCase(getNewsCommentsCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getCommentRepliesCount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getCommentRepliesCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.repliesCount = action.payload
            })
            .addCase(getCommentRepliesCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addComment.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // state.newsComments.push(action.payload);

            })
            .addCase(addComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const {removeCommentReplies} = commentSlice.actions;
export default commentSlice.reducer;
