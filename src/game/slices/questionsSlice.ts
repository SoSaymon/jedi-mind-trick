import {Question} from "../classes/Question";
import {createSlice} from "@reduxjs/toolkit";

interface QuestionsSliceState {
    questions: Question[];
    numberOfQuestions: number;
}

const initialState: QuestionsSliceState = {
    questions: [],
    numberOfQuestions: 0
}

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setNumberOfQuestions: (state, action) => {
            state.numberOfQuestions = action.payload;
        }
    }
});

export const {setQuestions, setNumberOfQuestions} = questionsSlice.actions;
export default questionsSlice.reducer;