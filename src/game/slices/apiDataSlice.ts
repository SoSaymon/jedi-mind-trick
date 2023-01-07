import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ApiDataState {
    url: string;
    category: string;
    data: string;
    error: string;
    apiDataAvailable: boolean;
}

const initialState: ApiDataState = {
    url: '',
    category: '',
    data: '',
    error: '',
    apiDataAvailable: false,
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
        setApiDataAvailable: (state, action: PayloadAction<boolean>) => {
            state.apiDataAvailable = action.payload;
        },
        resetApiData: (state) => {
            state.data = '';
            state.error = '';
            state.url = '';
            state.category = '';
            state.apiDataAvailable = false;
        }
    }
});

export const {setApiData, setApiError, setApiDataAvailable, setApiUrl, setApiCategory, resetApiData} = apiDataSlice.actions;
export default apiDataSlice.reducer;