import {useAppSelector} from "../hooks/redux";
import {useEffect, useState} from "react";
import {store} from "../store/store";
import {GameContentSubmitButton} from "./GameContentSubmitButton";
import {GameContentAnswerButton} from "./GameContentAnswerButton";

interface GameContentProps {
    questionNumber: number;
}

export const GameContent = ({questionNumber}: GameContentProps) => {
    const [questionsString, setQuestionsString] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [answers, setAnswers] = useState<any[]>([]);

    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    let answersList: any[] = [];

    const getQuestions = async () => {
        const state = store.getState();
        return state.questions;
    }

    const handleAnswerClick = (isCorrect: boolean) => {
        setIsAnswerSelected(true);
        setIsCorrect(isCorrect);
    }

    const handleSubmitClick = () => {
        setIsSubmitted(true);
        setIsAnswered(true);
    }

    useEffect(() => {
            if (questionsString === "") {
                getQuestions().then((data) => {
                    setQuestionsString(data.questions);
                })
            }
            if (questionsString !== "") {
                try {
                    const questions = JSON.parse(questionsString);
                    setCurrentQuestion(questions[questionNumber].question);
                    setAnswers(questions[questionNumber].answers);

                    if (answers.length > 0) {
                        console.log(typeof answers);
                    }

                } catch (e) {
                    console.error("Error parsing questions", e);
                }
            }
    }, [questionsString, questionNumber, currentQuestion]);

    if (answers.length > 0) {
        answersList = answers.map((answer, index) => (
            <GameContentAnswerButton key={index} answer={answer} isAnswerSelected={isAnswerSelected} isCorrect={isCorrect} handleAnswerClick={handleAnswerClick}/>
        ))
    }

    const numberOfQuestions = useAppSelector(state => state.questions.numberOfQuestions);
    return (
        <section className={"flex justify-center w-full min-h-full pt-2.5 pb-16 px-5 bg-lotion game"}>
            <div className={"flex flex-col justify-center items-center container w-full h-full game__container"}>
                <div className={"flex justify-between items-center w-full h-1/5 mb-5 container__ui"}>
                    <div className={"flex items-center w-1/3 h-full ui__score"}>
                        <span className={"text-xl font-bold"} style={{fontFamily: "'Ubuntu Mono', serif"}}>{questionNumber + 1}/{numberOfQuestions}</span>
                    </div>
                    <div className={"flex justify-end items-center w-1/3 h-full ui__timer"}>
                        <span className={"text-xl font-bold"} style={{fontFamily: "'Ubuntu Mono', serif"}}>00:00</span>
                    </div>
                </div>
                <div className={"flex flex-col justify-center items-center w-full h-3/5 container__game"}>
                    <div className={"flex justify-center items-center w-1/3 mb-5 font-bold text-2xl game__question"}>
                        <span>{currentQuestion === '' ? "Question" : currentQuestion}</span>
                    </div>
                    <div className={"flex flex-col justify-center items-center w-80 h-full mb-6 game__answers"}>
                        {answersList}
                    </div>
                </div>
                <div className={"flex justify-center items-center w-full h-16 container__button"}>
                    <GameContentSubmitButton isAnswerSelected={isAnswerSelected} isSubmitted={isSubmitted} handleButtonClick={handleSubmitClick}/>
                </div>
            </div>
        </section>
    );
}