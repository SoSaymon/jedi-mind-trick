export interface QuestionInterface {
    question: string;
    questionNumber: number;
    questionSubject: string;
    questionCategory: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
    isAnswered: boolean;
    isCorrect: boolean;
    makeQuestion: () => void;
    getQuestion: () => string;
    getQuestionNumber: () => number;
    getQuestionCorrectAnswer: () => string;
    getQuestionIncorrectAnswers: () => Array<string>;
    setIsAnswered: (isAnswered: boolean) => void;
    setIsCorrect: (isCorrect: boolean) => void;
}