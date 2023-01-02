import {createSlice} from "@reduxjs/toolkit";

interface ApiDataState {
    url: string;
    category?: string;
    data: any;
    error?: string;
}

const initialState: ApiDataState = {
    url: '',
    category: '',
    data: null,
    error: '',
}

export const apiDataSlice = createSlice({
    name: "apiData",
    initialState,
    reducers: {
        setApiData: (state, action) => {
            state.data = action.payload;
        },
        setApiError: (state, action) => {
            state.error = action.payload;
        },
        setApiUrl: (state, action) => {
            state.url = action.payload;
        },
        setApiCategory: (state, action) => {
            state.category = action.payload;
        },
    }
});

export const {setApiData, setApiError, setApiCategory, setApiUrl} = apiDataSlice.actions;
export default apiDataSlice.reducer;