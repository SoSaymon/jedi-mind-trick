import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useEffect, useState} from "react";
import {store} from "../store/store";
import {GameContentSubmitButton} from "./GameContentSubmitButton";
import {GameContentAnswerButton} from "./GameContentAnswerButton";
import {
    setCorrectAnsweredQuestions, setCurrentQuestionNumber,
    setSkippedQuestions,
    setWrongAnsweredQuestions
} from "../game/slices/questionsSlice";
import {useNavigate} from "react-router-dom";

interface GameContentProps {
    questionNumber: number;
}

export const GameContent = ({questionNumber}: GameContentProps) => {
    const [questionsString, setQuestionsString] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [answers, setAnswers] = useState<any[]>([]);

    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [correctAnswer, setCorrectAnswer] = useState(-1);

    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    let answersList: any[] = [];

    const getQuestions = async () => {
        const state = store.getState();
        return state.questions;
    }

    const handleAnswerClick = (isCorrect: boolean, index: number) => {
        const answer = document.getElementById(`answer${index}`);
        if (answer) {
            setIsAnswerSelected(true);
            setSelectedAnswer(index);

            answer.classList.remove("bg-light-silver");
            answer.classList.add("bg-yellow-sun");

            setIsCorrect(isCorrect);
        }
    }

    const handleSubmitClick = (mode: string) => {
        switch (mode) {
            case "submit":
                setIsSubmitted(true);

                if (isCorrect) {
                    dispatch(setCorrectAnsweredQuestions(questionNumber));
                    if (selectedAnswer !== -1) {
                        const selectedAnswerElement = document.getElementById(`answer${selectedAnswer}`);
                        if (selectedAnswerElement) {
                            selectedAnswerElement.classList.remove("bg-yellow-sun");
                            selectedAnswerElement.classList.add("bg-green");
                        }
                    }
                } else if (!isCorrect) {
                    dispatch(setWrongAnsweredQuestions(questionNumber));
                    if (selectedAnswer !== -1) {
                        const selectedAnswerElement = document.getElementById(`answer${selectedAnswer}`);
                        const correctAnswerElement = document.getElementById(`answer${correctAnswer}`);
                        if (selectedAnswerElement) {
                            selectedAnswerElement.classList.remove("bg-yellow-sun");
                            selectedAnswerElement.classList.add("bg-coral-red");
                            if (correctAnswerElement) {
                                correctAnswerElement.classList.remove("bg-light-silver");
                                correctAnswerElement.classList.add("bg-green");
                            }
                        }
                    }
                }
                break

            case "next":
                if (questionNumber < numberOfQuestions - 1) {
                    dispatch(setCurrentQuestionNumber(questionNumber + 1));
                    setIsAnswerSelected(false);
                    setIsCorrect(false);
                    setIsSubmitted(false);

                    const selectedAnswerElement = document.getElementById(`answer${selectedAnswer}`);
                    const correctAnswerElement = document.getElementById(`answer${correctAnswer}`);

                    if (selectedAnswerElement) {
                        const classNames = selectedAnswerElement.className.split(" ");
                        const filteredClassNames = classNames.filter(className => !className.startsWith("bg-"));
                        selectedAnswerElement.className = filteredClassNames.join(" ");
                        selectedAnswerElement.classList.add("bg-light-silver");
                    }

                    if (correctAnswerElement) {
                        const classNames = correctAnswerElement.className.split(" ");
                        const filteredClassNames = classNames.filter(className => !className.startsWith("bg-"));
                        correctAnswerElement.className = filteredClassNames.join(" ");
                        correctAnswerElement.classList.add("bg-light-silver");
                    }

                    setSelectedAnswer(-1);
                    setCorrectAnswer(-1);


                } else if (questionNumber === numberOfQuestions - 1) {
                    navigate("/results");
                }

                break

            case "skip":
                setIsAnswerSelected(true);
                setIsSubmitted(true);
                dispatch(setSkippedQuestions(questionNumber));

                break
        }
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
                    setCorrectAnswer(answers.findIndex((answer: any) => answer.correct === "true"));
                } catch (e) {
                    console.error("Error parsing questions", e);
                }
            }
    }, [questionsString, questionNumber, currentQuestion]);

    if (answers.length > 0) {
        answersList = answers.map((answer, index) => {
            return(
                <GameContentAnswerButton key={index} index={index} answer={answer} handleAnswerClick={handleAnswerClick}/>
            )
        })
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