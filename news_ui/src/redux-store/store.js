import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import newsSlice from "./newsSlice";
import authSlice from "./authSlice";

export const store = configureStore({
    reducer: {
        menu: menuSlice,
        news: newsSlice,
        auth: authSlice
    }
});