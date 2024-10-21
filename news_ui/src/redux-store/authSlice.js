import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAllNews} from "./newsSlice";
import axios from "axios";
import {API_URL} from "../util/helpers";


export const getTokens = createAsyncThunk("auth/getTokens", async () => {
    const response = await axios.get(API_URL+'api/v1/auth/token');
    const {accessToken, refreshToken} = response.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
});


const authSlice = createSlice({
    name: "auth",
    initialState: {
        authenticated: false,
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
                state.authenticated = true
            })
            .addCase(getAllNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },

});

export default authSlice.reducer;
