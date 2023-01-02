import {configureStore} from "@reduxjs/toolkit";
import {gameModeSlice} from "../game/slices/gameModeSlice";
import {apiDataAvailableSlice} from "../game/slices/apiDataAvailiableSlice";
import {questionsSlice} from "../game/slices/questionsSlice";
import {fetchApiDataMiddleware} from "../middleware/fetchApiDataMiddleware";
import {apiDataSlice} from "../game/slices/apiDataSlice";

export const store = configureStore({
    reducer: {
        gameMode: gameModeSlice.reducer,
        apiDataAvailable: apiDataAvailableSlice.reducer,
        questions: questionsSlice.reducer,
        apiData: apiDataSlice.reducer, // why it doesn't work?
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fetchApiDataMiddleware),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch