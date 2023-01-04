import {createSlice} from "@reduxjs/toolkit";

interface QuestionsSliceState {
    questions: string;
    numberOfQuestions: number;
    currentQuestionNumber: number;
}

const initialState: QuestionsSliceState = {
    questions: '',
    numberOfQuestions: 0,
    currentQuestionNumber: 0,
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
        },
        setCurrentQuestionNumber: (state, action) => {
            state.currentQuestionNumber = action.payload;
        }

    }
});

export const {setQuestions, setNumberOfQuestions, setCurrentQuestionNumber} = questionsSlice.actions;

export default questionsSlice.reducer;