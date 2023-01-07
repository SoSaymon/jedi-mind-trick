import {createSlice} from "@reduxjs/toolkit";

interface QuestionsSliceState {
    questions: string;
    numberOfQuestions: number;
    currentQuestionNumber: number;
    correctAnsweredQuestions: number[];
    skippedQuestions: number[];
    wrongAnsweredQuestions: number[];
}

const initialState: QuestionsSliceState = {
    questions: '',
    numberOfQuestions: 0,
    currentQuestionNumber: 0,
    correctAnsweredQuestions: [],
    skippedQuestions: [],
    wrongAnsweredQuestions: [],
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
        },
        setCorrectAnsweredQuestions: (state, action) => {
            state.correctAnsweredQuestions = state.correctAnsweredQuestions.concat(action.payload);
        },
        setSkippedQuestions: (state, action) => {
            state.skippedQuestions = state.skippedQuestions.concat(action.payload);
        },
        setWrongAnsweredQuestions: (state, action) => {
            state.wrongAnsweredQuestions = state.wrongAnsweredQuestions.concat(action.payload);
        },
        resetQuestions: (state) => {
            state.questions = '';
            state.numberOfQuestions = 0;
            state.currentQuestionNumber = 0;
            state.correctAnsweredQuestions = [];
            state.skippedQuestions = [];
            state.wrongAnsweredQuestions = [];
        }
    }
});

export const {setQuestions, setNumberOfQuestions, setCurrentQuestionNumber, setCorrectAnsweredQuestions, setWrongAnsweredQuestions, setSkippedQuestions, resetQuestions} = questionsSlice.actions;

export default questionsSlice.reducer;