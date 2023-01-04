import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {GameLoader} from "../components/GameLoader";
import {questionsPlaceholderList} from "../data/questionsLists/questionsPlaceholderList";
import {setNumberOfQuestions, setQuestions} from "../game/slices/questionsSlice";
import {GameContent} from "../components/GameContent";

export const Game = () => {
    const dispatch = useAppDispatch();
    const isApiDataLoaded = useAppSelector(state => state.apiData.apiDataAvailable);

    const questionNumber = useAppSelector(state => state.questions.currentQuestionNumber);
    const numberOfQuestions = useAppSelector(state => state.questions.numberOfQuestions);

    const makeQuestions = useCallback((numberOfQuestions: number) => {
        dispatch(setNumberOfQuestions(numberOfQuestions));

        const questionsToDraw = questionsPlaceholderList
        const questions = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            const randomIndex = Math.floor(Math.random() * questionsToDraw.length)
            questions.push(questionsToDraw[randomIndex])
            questionsToDraw.splice(randomIndex, 1)
        }
        const questionsString = JSON.stringify(questions)
        console.log(questionsString)
        dispatch(setQuestions(questionsString));
    }, [dispatch])

    useEffect(() => {
        if (isApiDataLoaded) {
            makeQuestions(10);
        }
    }, [isApiDataLoaded, makeQuestions]);

    useEffect(() => {
        return () => {
            document.title = `Question ${questionNumber + 1} / 10`;
        };
    }, [numberOfQuestions, questionNumber]);
    

    return (
        isApiDataLoaded ? // change to isQuestionReady
            <GameContent questionNumber={questionNumber}/>
            :
            <GameLoader/>

    );
}