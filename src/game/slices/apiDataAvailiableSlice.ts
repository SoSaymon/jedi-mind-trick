import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";

interface apiDataAvailableState {
    apiDataAvailable: boolean;
}

const initialState: apiDataAvailableState = {
    apiDataAvailable: false,

}
export const apiDataAvailableSlice = createSlice({
    name: "apiDataAvailable",
    initialState,
    reducers: {
        setApiDataAvailable: (state, action: PayloadAction<boolean>) => {
            state.apiDataAvailable = action.payload;
        },
    }
});

export const {setApiDataAvailable} = apiDataAvailableSlice.actions;
export const isApiDataAvailable = (state: RootState) => state.apiDataAvailable.apiDataAvailable;
export default apiDataAvailableSlice.reducer;
