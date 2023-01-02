import {QuestionInterface} from "../interfaces/questionInterface";

export class Question implements QuestionInterface {
    question: string;
    questionNumber: number;
    questionSubject: string;
    questionCategory: string;
    correct_answer: string;
    incorrect_answers: Array<string>;
    isAnswered: boolean;
    isCorrect: boolean;
    constructor(question: string, questionNumber: number, questionSubject: string, questionCategory: string, correct_answer: string, incorrect_answers: Array<string>) {
        this.question = question;
        this.questionNumber = questionNumber;
        this.questionSubject = questionSubject;
        this.questionCategory = questionCategory;
        this.correct_answer = correct_answer;
        this.incorrect_answers = incorrect_answers;
        this.isAnswered = false;
        this.isCorrect = false;
    }
    makeQuestion() {
        console.log("Question made");
    }
    getQuestion() {
        return this.question;
    }
    getQuestionNumber() {
        return this.questionNumber;
    }
    getQuestionCorrectAnswer() {
        return this.correct_answer;
    }
    getQuestionIncorrectAnswers() {
        return this.incorrect_answers;
    }
    setIsCorrect(isCorrect: boolean) {
        this.isCorrect = isCorrect;
    }
    setIsAnswered(isAnswered: boolean) {
        this.isAnswered = isAnswered;
    }
}