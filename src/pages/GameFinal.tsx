import {useEffect} from "react";
import {ScoreMark} from "../components/ScoreMark";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../hooks/redux";
import {resetQuestions} from "../game/slices/questionsSlice";
import {resetApiData} from "../game/slices/apiDataSlice";

export const GameFinal = () => {
    const correctAnswers = useAppSelector(state => state.questions.correctAnsweredQuestions);
    const wrongAnswers = useAppSelector(state => state.questions.wrongAnsweredQuestions);

    const numberOfQuestions = useAppSelector(state => state.questions.numberOfQuestions);
    
    let scoreMarks: any[] = [];

    if ((numberOfQuestions && correctAnswers && wrongAnswers) !== undefined) {

        for (let i = 0; i < numberOfQuestions;) {
            if (correctAnswers.includes(i)) {
                scoreMarks.push(<ScoreMark key={i} scored={"true"}/>);
            } else if (wrongAnswers.includes(i)) {
                scoreMarks.push(<ScoreMark key={i} scored={"false"}/>);
            } else {
                scoreMarks.push(<ScoreMark key={i} scored={"skip"}/>);
            }
            i++;
        }
    }

    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Game Over";
    }, []);
    return (
        <div className={"flex justify-center w-full min-h-full pt-16 pb-16 px-5 bg-lotion game-final"}>
            <div className={"flex flex-col justify-center items-center container w-full h-full game-final__container"}>
                <div className={"flex justify-center items-center w-full h-1/5 mb-5 text-3xl font-bold game-final__title"}>You scored<span className={"text-yellow-sun"}>&nbsp; {correctAnswers.length} &nbsp;</span>points!</div>
                <div className={"grid grid-cols-2 justify-center align-middle items-center justify-self-center w-64 h-3/5 game-final__score"}>
                    {scoreMarks.map((scoreMark) => scoreMark)}
                </div>
                <button className={"flex justify-center items-center w-64 h-16 text-2xl font-bold text-white bg-green rounded-3xl game-final__button"} onClick={() => {
                    navigate('/game-select');
                    resetQuestions();
                    resetApiData();
                    window.location.reload();
                }}>
                    Play again
                </button>
                <button className={"flex justify-center items-center w-64 h-16 text-2xl mt-5 font-bold text-white bg-coral-red rounded-3xl game-final__button"} onClick={() => {
                    navigate('/');
                    resetQuestions();
                    resetApiData();
                    window.location.reload();
                }}>
                    Go to homepage
                </button>
            </div>
        </div>
    );
}