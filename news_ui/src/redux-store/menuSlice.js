import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getMenu = createAsyncThunk("menu/getMenu", async () => {
    const url = 'app/meni';
    return axios
        .get(url)
        .then((results) => results.data);
});

const menuSlice = createSlice({
    name: "menu",
    initialState: {
        items: [],
        error: null,
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMenu.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMenu.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },

});

export default menuSlice.reducer;