import {configureStore} from "@reduxjs/toolkit";
import {gameModeSlice} from "../game/slices/gameModeSlice";
import {apiDataAvailableSlice} from "../game/slices/apiDataAvailiableSlice";

export const store = configureStore({
    reducer: {
        gameMode: gameModeSlice.reducer,
        apiDataAvailable: apiDataAvailableSlice.reducer
    }
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch