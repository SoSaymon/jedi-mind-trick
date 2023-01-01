import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";

interface apiDataAvailableState {
    apiDataAvailable: boolean;
    error: string;
}

const initialState: apiDataAvailableState = {
    apiDataAvailable: false,
    error: ""

}
export const apiDataAvailableSlice = createSlice({
    name: "apiDataAvailable",
    initialState,
    reducers: {
        setApiDataAvailable: (state, action: PayloadAction<boolean>) => {
            state.apiDataAvailable = action.payload;
        },
        setApiDataAvailableError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    }
});

export const {setApiDataAvailable} = apiDataAvailableSlice.actions;
export const isApiDataAvailable = (state: RootState) => state.apiDataAvailable.apiDataAvailable;
export const selectApiDataAvailableError = (state: RootState) => state.apiDataAvailable.error;
export default apiDataAvailableSlice.reducer;
