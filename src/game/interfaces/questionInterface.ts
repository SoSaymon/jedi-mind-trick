export interface QuestionInterface {
    question: string;
    questionNumber: number;
    questionSubject: string;
    questionCategory: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
    makeQuestion: () => void;
    getQuestion: () => string;
}