import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useEffect, useRef, useState} from "react";
import {GameContentSubmitButton} from "./GameContentSubmitButton";
import {
    setCorrectAnsweredQuestions,
    setCurrentQuestionNumber,
    setSkippedQuestions,
    setWrongAnsweredQuestions
} from "../game/slices/questionsSlice";
import {useNavigate} from "react-router-dom";
import {store} from "../store/store";
import {GameContentAnswerButton} from "./GameContentAnswerButton";

interface GameContentProps {
    questionNumber: number;
}

export const GameContent = ({questionNumber}: GameContentProps) => {
    // questions states
    const [questionsString, setQuestionsString] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");

    // answers states
    const [answers, setAnswers] = useState<any[]>([]);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number>(-1);
    const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(-1);

    // game states
    const [isAnswerSelected, setIsAnswerSelected] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // answer creation states
    const [questionSubject, setQuestionSubject] = useState("");
    const [answerCreationCorrectAnswer, setAnswerCreationCorrectAnswer] = useState({answer: "", correct: true});
    const [answerCreationWrongAnswers, setAnswerCreationWrongAnswers] = useState<any[]>([]);
    let currentObject: any = {};
    let randomObjects: any[] = [];

    // game data
    const apiData = useAppSelector(state => state.apiData.data);
    // const [requiredAnotherApiCall, setRequiredAnotherApiCall] = useState<any[]>([]); // this will be useful when I'll add multi api calls support
    const [requiredAnswer, setRequiredAnswer] = useState("");

    const numberOfQuestions = useAppSelector(state => state.questions.numberOfQuestions);

    let answersList = useRef<JSX.Element[]>([]);
    let question: string = ""; // this or currentQuestion will work

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // handlers
    const handleAnswerClick = (isCorrect: boolean, index: number) => {
        const answer = document.getElementById(`answer${index}`);
        if (answer) {
            if (selectedAnswerIndex !== -1) {
                const prevAnswer = document.getElementById(`answer${selectedAnswerIndex}`);
                if (prevAnswer) {
                    prevAnswer.classList.remove("bg-yellow-sun");
                    prevAnswer.classList.add("bg-light-silver");
                }
            }
            setIsAnswerSelected(true);
            setSelectedAnswerIndex(index);
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
                    if (selectedAnswerIndex !== -1) {
                        const selectedAnswerElement = document.getElementById(`answer${selectedAnswerIndex}`);
                        if (selectedAnswerElement) {
                            selectedAnswerElement.classList.remove("bg-yellow-sun");
                            selectedAnswerElement.classList.add("bg-green");
                        }
                    }
                } else if (!isCorrect) {
                    dispatch(setWrongAnsweredQuestions(questionNumber));
                    if (selectedAnswerIndex !== -1) {
                        const selectedAnswerElement = document.getElementById(`answer${selectedAnswerIndex}`);
                        const correctAnswerElement = document.getElementById(`answer${correctAnswerIndex}`);
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
                    const selectedAnswerElement = document.getElementById(`answer${selectedAnswerIndex}`);
                    const correctAnswerElement = document.getElementById(`answer${correctAnswerIndex}`);
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
                    setSelectedAnswerIndex(-1);
                    setCorrectAnswerIndex(-1);
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

    // question fetching
    const fetchQuestion = async () => {
        return store.getState().questions;
    }

    // question creation
    const loadQuestionsToState = () => {
        fetchQuestion().then((questions) => {
            setQuestionsString(questions.questions);
        });
    }
    const createQuestion = () => {
        try {
            const questions = JSON.parse(questionsString);
            setCurrentQuestion(questions[questionNumber].question);
            setRequiredAnswer(questions[questionNumber].requiredAnswer);
        } catch (e) {
            console.error("Error while creating question: ", e);
        }
    }

    // answers creation
    const createAnswers = () => {
        const parsedAnswers = JSON.parse(questionsString);
        let answers = parsedAnswers[questionNumber].answers;

        if (answers.length > 0 && answersList.current.length === 0) {
            answers.sort(() => Math.random() - 0.5);
            answers.forEach((answer: any, index: number) => {
                if (answer.correct === "true") {
                    setCorrectAnswerIndex(index);
                    answer.answer = answer.answer.replace("CORRECT_ANSWER", currentObject[requiredAnswer]);
                    setAnswerCreationCorrectAnswer(answer);
                } else if (answer.correct === "false") {
                    // @ts-ignore
                    answer.answer = answer.answer.replace("INCORRECT_ANSWER", randomObjects[0] === undefined ? "undefi" : randomObjects[0]);
                    // @ts-ignore
                    randomObjects.splice(0, 1);
                    setAnswerCreationWrongAnswers(prevState => {
                        if (prevState.length >= 3) {
                            // @ts-ignore
                            return parsedAnswers[questionNumber].answers.filter(answer => answer.correct === "false");
                        }
                        return [...prevState, answer];
                    });
                }
            });
        }
    }

    //update answers list
    const updateAnswersList = () => {
        if (answers.length > 0) {
            answersList.current = answers.map((answer: any, index: number) => (
                <GameContentAnswerButton key={index} index={index} answer={answer} handleAnswerClick={handleAnswerClick}/>
            ));
            console.log(answersList);
        }
    }

    //TODO: add question maker
    //creating objects
    const createCurrentObject = () => {
        const randIndex = Math.floor(Math.random() * apiData.length);
        currentObject = apiData[randIndex];
        setQuestionSubject(currentObject.name);
    }
    const createRandomObjects = () => {
        let randomIndex = Math.floor(Math.random() * apiData.length);
        let randomObject = apiData[randomIndex];
        let answers = [];
        if (randomObject.name !== currentObject.name) {
            for (let i = 0; i < 3; i++) {
                if (currentObject[requiredAnswer] !== randomObject[requiredAnswer]) {
                    answers.push(randomObject[requiredAnswer]);
                } else {
                    // i--;
                    // continue;
                }
            }
            randomObjects = answers;
        }
    }

    //useEffects
    useEffect(() => {
        if (questionsString === "") {
            loadQuestionsToState();
        }
        if (questionsString !== "") {
            createQuestion();
            createCurrentObject();
            createRandomObjects();

            if (currentQuestion !== "" && randomObjects.length > 0) {
                createAnswers();
            }
        }
    }, [questionsString, questionNumber, currentQuestion]);

    // creating question
    if (questionSubject !== "" && currentQuestion !== "") {
        question = currentQuestion.replace("INSERT_NAME", questionSubject);
    }

    // mapping answers
    useEffect(() => {
        if (answerCreationCorrectAnswer.answer !== "" && answerCreationWrongAnswers.length > 0) {
            const currentAnswers = [...answerCreationWrongAnswers];
            currentAnswers.splice(correctAnswerIndex, 0, answerCreationCorrectAnswer);
            console.log(answers);
            setAnswers(currentAnswers);
        }
    }, [answerCreationCorrectAnswer, answerCreationWrongAnswers, correctAnswerIndex]);

    useEffect(() => {
        if (answers.length > 0) {
            updateAnswersList();
        }
    }, [currentQuestion]);

    return (
        <section className={"flex justify-center w-full min-h-full pt-2.5 pb-16 px-5 bg-lotion game"}>
            <div className={"flex flex-col justify-center items-center container w-full h-full game__container"}>
                <div className={"flex justify-between items-center w-full h-1/5 mb-5 container__ui"}>
                    <div className={"flex items-center w-1/3 h-full ui__score"}>
                        <span className={"text-xl font-bold"} style={{fontFamily: "'Ubuntu Mono', serif"}}>{questionNumber + 1}/{numberOfQuestions}</span>
                    </div>
                    <div className={"flex justify-end items-center w-1/3 h-full ui__stopwatch"}>
                        {/*TODO: add stopwatch*/}
                        <span className={"text-xl font-bold"} style={{fontFamily: "'Ubuntu Mono', serif"}}>00:00</span>
                    </div>
                </div>
                <div className={"flex flex-col justify-center items-center w-full h-3/5 container__game"}>
                    <div className={"flex justify-center items-center w-1/3 mb-5 font-bold text-2xl game__question"}>
                        <span>{currentQuestion === "" ? "Question" : question}</span>
                    </div>
                    <div className={"flex flex-col justify-center items-center w-80 h-full mb-6 game__answers"}>
                        {answersList.current.length > 0 ? answersList.current : "Answers"}
                    </div>
                </div>
                <div className={"flex justify-center items-center w-full h-16 container__button"}>
                    <GameContentSubmitButton isAnswerSelected={isAnswerSelected} isSubmitted={isSubmitted} handleButtonClick={handleSubmitClick}/>
                </div>
            </div>
        </section>
    );
}