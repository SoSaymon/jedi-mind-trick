import {configureStore} from "@reduxjs/toolkit";
import {questionsSlice} from "../game/slices/questionsSlice";
import {apiDataSlice} from "../game/slices/apiDataSlice"
import {fetchApiDataMiddleware} from "../middleware/fetchApiDataMiddleware";

export const store = configureStore({
    reducer: {
        questions: questionsSlice.reducer,
        apiData: apiDataSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchApiDataMiddleware),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch