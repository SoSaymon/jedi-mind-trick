import {useEffect} from "react";
import {ScoreMark} from "../components/ScoreMark";
import {useNavigate} from "react-router-dom";

export const GameFinal = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "Game Over";
    }, []);
    return (
        <div className={"flex justify-center w-full min-h-full pt-16 pb-16 px-5 bg-lotion game-final"}>
            <div className={"flex flex-col justify-center items-center container w-full h-full game-final__container"}>
                <div className={"flex justify-center items-center w-full h-1/5 mb-5 text-3xl font-bold game-final__title"}>You scored<span className={"text-yellow-sun"}>&nbsp; 10 &nbsp;</span>points!</div>
                <div className={"grid grid-cols-2 justify-center align-middle items-center justify-self-center w-64 h-3/5 game-final__score"}>
                    <ScoreMark questionNumber={1} scored={true}/>
                    <ScoreMark questionNumber={2} scored={false}/>
                    <ScoreMark questionNumber={3} scored={true}/>
                    <ScoreMark questionNumber={4} scored={false}/>
                    <ScoreMark questionNumber={5} scored={true}/>
                    <ScoreMark questionNumber={6} scored={false}/>
                    <ScoreMark questionNumber={7} scored={true}/>
                    <ScoreMark questionNumber={8} scored={false}/>
                    <ScoreMark questionNumber={9} scored={true}/>
                    <ScoreMark questionNumber={10} scored={false}/>
                </div>
                <button className={"flex justify-center items-center w-64 h-16 text-2xl font-bold text-white bg-green rounded-3xl game-final__button"} onClick={() => navigate('/game-select')}>Play again</button>
                <button className={"flex justify-center items-center w-64 h-16 text-2xl mt-5 font-bold text-white bg-coral-red rounded-3xl game-final__button"} onClick={() => navigate('/')}>Go to homepage</button>
            </div>
        </div>
    );
}