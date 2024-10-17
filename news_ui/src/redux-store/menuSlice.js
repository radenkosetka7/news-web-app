import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import base from "../services/base.service";
const instance = base.service();
export const getMenu = createAsyncThunk("menu/getMenu", async () => {
    return instance
        .get('app/meni')
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