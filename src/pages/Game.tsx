import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {setApiDataAvailable} from "../game/slices/apiDataAvailiableSlice";
import {GameLoader} from "../components/GameLoader";

export const Game = () => {
    const dispatch = useAppDispatch();
    const isApiDataLoaded = useAppSelector(state => state.apiDataAvailable.apiDataAvailable);
    useEffect(() => {
        document.title = "Question 1/10";
        console.log("isApiDataLoaded", isApiDataLoaded);
        let timer = setTimeout(() => {
            dispatch(setApiDataAvailable(true));
        }, 10000);
        return () => {
            clearTimeout(timer);
        }
    }, [dispatch, isApiDataLoaded]);
    return (
        isApiDataLoaded ?
            <section className={"flex justify-center w-full min-h-full pt-2.5 pb-16 px-5 bg-lotion game"}>
            <div className={"flex flex-col justify-center items-center container w-full h-full game__container"}>
                <div className={"flex justify-between items-center w-full h-1/5 mb-5 container__ui"}>
                    <div className={"flex items-center w-1/3 h-full ui__score"}>
                        <span className={"text-xl font-bold"} style={{fontFamily: "'Ubuntu Mono', serif"}}>0/10</span>
                    </div>
                    <div className={"flex justify-end items-center w-1/3 h-full ui__timer"}>
                        <span className={"text-xl font-bold"} style={{fontFamily: "'Ubuntu Mono', serif"}}>00:00</span>
                    </div>
                </div>
                <div className={"flex flex-col justify-center items-center w-full h-3/5 container__game"}>
                    <div className={"flex justify-center items-center w-1/3 mb-5 font-bold text-2xl game__question"}>
                        <span>Question</span>
                    </div>
                    <div className={"flex flex-col justify-center items-center w-80 h-full mb-6 game__answers"}>
                        <button className={"flex justify-center items-center w-full h-20 rounded-full mb-5 text-xl font-medium bg-light-silver"}>Answer 1</button>
                        <button className={"flex justify-center items-center w-full h-20 rounded-full mb-5 text-xl font-medium bg-light-silver"}>Answer 2</button>
                        <button className={"flex justify-center items-center w-full h-20 rounded-full mb-5 text-xl font-medium bg-light-silver"}>Answer 3</button>
                        <button className={"flex justify-center items-center w-full h-20 rounded-full mb-5 text-xl font-medium bg-light-silver"}>Answer 4</button>
                    </div>
                </div>
                <div className={"flex justify-center items-center w-full h-16 container__button"}>
                    <button className={"flex justify-center items-center w-3/5 h-full rounded-full text-2xl font-bold text-white bg-green"}>Next</button>
                </div>
            </div>
            </section>
            :
            <GameLoader />
    );
}