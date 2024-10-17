
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import base from "../services/base.service";
import {getAllNews} from "./newsSlice";

const instance = base.service();

export const getTokens = createAsyncThunk("auth/getTokens", async () => {
    const response= await instance.get('http://127.0.0.1:9001/api/v1/auth/token');
    const {accessToken,refreshToken} = response.data;
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
                state.allNews = true
            })
            .addCase(getAllNews.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },

});

export default authSlice.reducer;
