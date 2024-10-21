import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import baseService from "../services/base.service";
import {API_URL} from "../util/helpers";

export const getLastWeekStatistics = createAsyncThunk("statistics/getLastWeekStatistics", async () => {
    return baseService
        .get(API_URL+'api/v1/statistics/last-week')
        .then((results) => results.data);
});

export const getTop10News = createAsyncThunk("statistics/getTop10News", async () => {
    return baseService
        .get(API_URL+'api/v1/comments/top-news')
        .then((results) => results.data);
});

export const addStatistic = createAsyncThunk("statistics/postStatistic", async (data) => {
    return baseService
        .post(API_URL+'api/v1/statistics', data)
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