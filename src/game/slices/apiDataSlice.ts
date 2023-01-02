import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

interface ApiDataSliceState {
    url: string;
    category: string;
    apiData?: any;
    loading: boolean;
    error: string | null;
}

const initialState: ApiDataSliceState = {
    url: "",
    category: "",
    apiData: null,
    loading: false,
    error: null,
};

export const apiDataSlice = createSlice({
    name: "apiData",
    initialState,
    reducers: {
        setUrl(state, action) {
            state.url = action.payload;
            // lookup if action.type exists, if so see what it looks like
            console.log(action.type);
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        fetchApiDataStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchApiDataSuccess: (state, action) => {
            state.apiData = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchApiDataError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {setUrl, setCategory, fetchApiDataStart, fetchApiDataSuccess, fetchApiDataError} = apiDataSlice.actions;

export const fetchApiData = (state: ApiDataSliceState) => {
    axios.get(state.url)
        .then((response) => {
            fetchApiDataSuccess(response.data);
        })
        .catch((error) => {
            fetchApiDataError(error.message);
        });
}

export default apiDataSlice.reducer;
