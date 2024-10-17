import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import base from "../services/base.service";

const instance = base.service();

export const getAllNews = createAsyncThunk("news/getAllNews", async () => {
    return instance
        .get('app/v2/naslovna')
        .then((results) => results.data);
});

const newsSlice = createSlice({
    name: "news",
    initialState: {
        allNews: [],
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
            });
    },

});

export default newsSlice.reducer;