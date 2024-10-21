import {configureStore} from "@reduxjs/toolkit";
import menuSlice from "./menuSlice";
import newsSlice from "./newsSlice";
import authSlice from "./authSlice";
import commentSlice from "./commentSlice";
import statisticSlice from "./statisticSlice";

export const store = configureStore({
    reducer: {
        menu: menuSlice,
        news: newsSlice,
        auth: authSlice,
        comments: commentSlice,
        statistic: statisticSlice
    }
});