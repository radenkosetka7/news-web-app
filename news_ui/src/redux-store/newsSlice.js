import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import base from "../services/base.service";

const instance = base.service();

export const getAllNews = createAsyncThunk("news/getAllNews", async () => {
    return instance
        .get('app/v2/naslovna')
        .then((results) => results.data);
});

export const getAllSectionNews = createAsyncThunk("news/getAllSectionNews", async ({id, page, size}) => {
    return instance
        .get(`app/rubrika/${id}/${page}/${size}`)
        .then((results) => results.data);
});

export const getAllSubsectionNews = createAsyncThunk("news/getAllSubsectionNews", async ({id, page, size}) => {
    return instance
        .get(`app/podrubrika/${id}/${page}/${size}`)
        .then((results) => results.data);
});

export const getNewsDetails = createAsyncThunk("news/getNewsDetails", async (id) => {
    return instance
        .get(`app/v2/vijesti/${id}`)
        .then((results) => results.data);
});


const newsSlice = createSlice({
    name: "news",
    initialState: {
        allNews: [],
        sectionNews: [],
        subsectionNews:[],
        selectedNews: null,
        selectedNewsStatus: 'idle',
        sectionStatus: 'idle',
        subsectionStatus: 'idle',
        error: null,
        status: 'idle',
    },
    reducers: {},
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
            });
    },

});

export default newsSlice.reducer;