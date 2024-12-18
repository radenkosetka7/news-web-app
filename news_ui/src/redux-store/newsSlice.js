import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import apiService from "../services/api.service";

export const getAllNews = createAsyncThunk("news/getAllNews", async () => {
    return apiService
        .get('app/v2/naslovna')
        .then((results) => results.data);
});

export const getAllSectionNews = createAsyncThunk("news/getAllSectionNews", async ({id, page, size}) => {
    return apiService
        .get(`app/rubrika/${id}/${page}/${size}`)
        .then((results) => results.data);
});

export const getAllSubsectionNews = createAsyncThunk("news/getAllSubsectionNews", async ({id, page, size}) => {
    return apiService
        .get(`/app/podrubrika/${id}/${page}/${size}`)
        .then((results) => results.data);
});

export const getNewsDetails = createAsyncThunk("news/getNewsDetails", async (id) => {
    return apiService
        .get(`app/v2/vijesti/${id}`)
        .then((results) => results.data);
});

export const getTop10NewsWithDetails = createAsyncThunk("news/top10", async (top10News) => {
    const newsDetailsPromises = top10News.map(async (news) => {
        const newsDetails = await apiService.get(`app/v2/vijesti/${news.newsId}`);
        return {
            ...newsDetails.data,
            totalComments: news.totalComments
        }
    });
    return await Promise.all(newsDetailsPromises);
});


const newsSlice = createSlice({
    name: "news",
    initialState: {
        allNews: [],
        currentPage: 0,
        sectionNews: [],
        subsectionNews: [],
        selectedNews: null,
        top10DetailsNews: [],
        selectedNewsStatus: 'idle',
        sectionStatus: 'idle',
        subsectionStatus: 'idle',
        error: null,
        status: 'idle',
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNews.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllNews.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allNews = action.payload
            })
            .addCase(getAllNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getAllSectionNews.pending, (state) => {
                state.sectionStatus = 'loading';
            })
            .addCase(getAllSectionNews.fulfilled, (state, action) => {
                state.sectionStatus = 'succeeded';
                state.sectionNews = action.payload
            })
            .addCase(getAllSectionNews.rejected, (state, action) => {
                state.sectionStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(getAllSubsectionNews.pending, (state) => {
                state.subsectionStatus = 'loading';
            })
            .addCase(getAllSubsectionNews.fulfilled, (state, action) => {
                state.subsectionStatus = 'succeeded';
                state.subsectionNews = action.payload
            })
            .addCase(getAllSubsectionNews.rejected, (state, action) => {
                state.subsectionStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(getNewsDetails.pending, (state) => {
                state.selectedNewsStatus = 'loading';
            })
            .addCase(getNewsDetails.fulfilled, (state, action) => {
                state.selectedNewsStatus = 'succeeded';
                state.selectedNews = action.payload
            })
            .addCase(getNewsDetails.rejected, (state, action) => {
                state.selectedNewsStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(getTop10NewsWithDetails.pending, (state) => {
                state.selectedNewsStatus = 'loading';
            })
            .addCase(getTop10NewsWithDetails.fulfilled, (state, action) => {
                state.selectedNewsStatus = 'succeeded';
                state.top10DetailsNews = action.payload
            })
            .addCase(getTop10NewsWithDetails.rejected, (state, action) => {
                state.selectedNewsStatus = 'failed';
                state.error = action.error.message;
            });
    },

});

export const {setCurrentPage} = newsSlice.actions;

export default newsSlice.reducer;