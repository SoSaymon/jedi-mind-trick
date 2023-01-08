import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {GameLoader} from "../components/GameLoader";
import {questionsPeople} from "../data/questionsLists/questionsPeople";
import {questionsPlanets} from "../data/questionsLists/questionsPlanets";
import {setNumberOfQuestions, setQuestions} from "../game/slices/questionsSlice";
import {GameContent} from "../components/GameContent";
import {questionsStarships} from "../data/questionsLists/questionsStarships";
import {questionsVehicles} from "../data/questionsLists/questionsVehicles";
import {questionsSpecies} from "../data/questionsLists/questionsSpecies";

export const Game = () => {
    const dispatch = useAppDispatch();
    const isApiDataLoaded = useAppSelector(state => state.apiData.apiDataAvailable);

    const questionNumber = useAppSelector(state => state.questions.currentQuestionNumber);
    const numberOfQuestions = useAppSelector(state => state.questions.numberOfQuestions);
    const category = useAppSelector(state => state.apiData.category);

    const makeQuestions = useCallback((numberOfQuestions: number) => {
        dispatch(setNumberOfQuestions(numberOfQuestions));
        let questionsToDraw: any[] = [];

        switch (category) {
            case "people":
                questionsToDraw = questionsPeople;
                break;
            case "planets":
                questionsToDraw = questionsPlanets;
                break;
            case "starships":
                questionsToDraw = questionsStarships;
                break;
            case "vehicles":
                questionsToDraw = questionsVehicles;
                break;
            case "species":
                questionsToDraw = questionsSpecies;
                break;
        }

        const questionsArray: any[] = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            const randomIndex = Math.floor(Math.random() * questionsToDraw.length)
            questionsArray.push(questionsToDraw[randomIndex]);
        }
        const questionsString = JSON.stringify(questionsArray);
        dispatch(setQuestions(questionsString));
    }, [category, dispatch]);

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
        isApiDataLoaded ?
            <GameContent questionNumber={questionNumber}/>
            :
            <GameLoader/>

    );
}