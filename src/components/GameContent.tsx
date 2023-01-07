import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useEffect, useState} from "react";
import {store} from "../store/store";
import {GameContentSubmitButton} from "./GameContentSubmitButton";
import {GameContentAnswerButton} from "./GameContentAnswerButton";
import {
    setCorrectAnsweredQuestions,
    setCurrentQuestionNumber,
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
    let answers: any[] = []

    const [selectedAnswer, setSelectedAnswer] = useState(-1);
    const [correctAnswer, setCorrectAnswer] = useState(-1);

    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const apiData = useAppSelector(state => state.apiData.data);
    // const [requiredAnotherApiCall, setRequiredAnotherApiCall] = useState<any[]>([]); // this will be useful when I'll add multi api calls support
    const [requiredAnswer, setRequiredAnswer] = useState("");

    // start of answers creator data
    const [answerCreatorQuestionSubject, setAnswerCreatorQuestionSubject] = useState("");
    const [answerCreatorCorrectAnswer, setAnswerCreatorCorrectAnswer] = useState("");
    const [answerCreatorIncorrectAnswers, setAnswerCreatorIncorrectAnswers] = useState<any[]>([]);
    // end of answers creator data

    let currentObject: any = {};

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    let answersList: any[] = [];

    let question: any = "";

    const getQuestions = async () => {
        const state = store.getState();
        return state.questions;
    }

    // start handlers
    const handleAnswerClick = (isCorrect: boolean, index: number) => {
        const answer = document.getElementById(`answer${index}`);
        if (answer) {
            if (selectedAnswer !== -1) {
                const prevAnswer = document.getElementById(`answer${selectedAnswer}`);
                if (prevAnswer) {
                    prevAnswer.classList.remove("bg-yellow-sun");
                    prevAnswer.classList.add("bg-light-silver");
                }
            }

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
    // end handlers

    // start answers creator
    const answersCreator = () => {
        let randomIndex = Math.floor(Math.random() * apiData.length);
        currentObject = apiData[randomIndex];
        setAnswerCreatorQuestionSubject(currentObject.name);
        setAnswerCreatorCorrectAnswer(currentObject[requiredAnswer]);

        // create incorrect answers
        let incorrectAnswers: any[] = [];

        for (let i = 0; i < 3; i++) {
            const randomObject = apiData[Math.floor(Math.random() * apiData.length)];
            // @ts-ignore
            if (randomObject[requiredAnswer] === currentObject[requiredAnswer] || incorrectAnswers.includes(randomObject[requiredAnswer])) {
                continue;
            }
            // @ts-ignore
            incorrectAnswers.push(randomObject[requiredAnswer]);
        }

        setAnswerCreatorIncorrectAnswers(incorrectAnswers);
    }
    // end answers creator

    useEffect(() => {
        if (questionsString === "") {
            getQuestions().then((data) => {
                setQuestionsString(data.questions);
            })
        }
        if (questionsString !== "") {
            try {
                const questions = JSON.parse(questionsString);

                // setting up states from questions received from redux store
                setCurrentQuestion(questions[questionNumber].question);
                // setRequiredAnotherApiCall(questions[questionNumber].requiredAnotherApiCall);
                setRequiredAnswer(questions[questionNumber].requiredAnswer);
                answersCreator();
            } catch (e) {
                console.error("Error parsing questionsPeople", e);
            }
        }
    }, [questionsString, questionNumber, currentQuestion]);

    if (answerCreatorQuestionSubject !== "" && currentQuestion !== "") {
        question = currentQuestion.replace("INSERT_NAME", answerCreatorQuestionSubject);
    }

    if (answerCreatorCorrectAnswer !== "" && answerCreatorIncorrectAnswers.length > 0) {
        answers = [answerCreatorCorrectAnswer, ...answerCreatorIncorrectAnswers];
    }

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
                        <span>{currentQuestion === '' ? "Question" : question}</span>
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