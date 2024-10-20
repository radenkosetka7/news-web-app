import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import baseService from "../services/base.service";

export const getLastWeekStatistics = createAsyncThunk("statistics/getLastWeekStatistics", async () => {
    const url = `http://127.0.0.1:9001/api/v1/statistics/last-week`;
    return baseService
        .get(url)
        .then((results) => results.data);
});

export const getTop10News = createAsyncThunk("statistics/getTop10News", async () => {
    const url = `http://127.0.0.1:9001/api/v1/comments/top-news`;
    return baseService
        .get(url)
        .then((results) => results.data);
});
export const addStatistic = createAsyncThunk("statistics/postStatistic", async (data) => {
    const url = `http://127.0.0.1:9001/api/v1/statistics`;
    return baseService
        .post(url, data)
        .then((results) => results.data);
});


const statisticSlice = createSlice({
    name: 'statistic',
    initialState: {
        statisticData: [],
        top10News: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLastWeekStatistics.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLastWeekStatistics.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.statisticData = action.payload
            })
            .addCase(getLastWeekStatistics.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(getTop10News.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getTop10News.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.top10News = action.payload
            })
            .addCase(getTop10News.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addStatistic.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addStatistic.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(addStatistic.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default statisticSlice.reducer;