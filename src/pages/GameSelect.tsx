import {useEffect} from "react";
import {GameSelectButton} from "../components/GameSelectButton";

interface GameSelectProps {
    gameModes: {name: string, path: string}[];
}
export const GameSelect = ({gameModes}: GameSelectProps) => {
    useEffect(() => {
        document.title = "Game Select";
    }, []);

    const handleClick = () => {
        console.log("clicked");
        //TODO: Add functionality
    }
    return (
        <section className={"flex justify-center w-full min-h-full pt-10 px-12 bg-lotion game-select"}>
            <div className={"flex flex-col justify-center items-center container w-80 h-full game-select__container"}>
                {gameModes.map((gameMode, index) => {
                    return (
                        <GameSelectButton gameMode={gameMode.name} onClick={handleClick} key={index}/>
                    );
                })}
            </div>
        </section>
    );
}