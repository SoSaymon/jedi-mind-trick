import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../hooks/redux";
import {setGameMode} from "../game/slices/gameModeSlice";

interface GameSelectButtonProps {
    name: string;
    mode: string;
}
export const GameSelectButton = ({name, mode}: GameSelectButtonProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleClick = (mode: string) => {
        dispatch(setGameMode(mode));
        navigate('/game');
    }
    return (
        // TODO: Add bem classnames
        <button className={"flex justify-center items-center w-full h-40 rounded-3xl mb-10 text-2xl font-bold bg-light-silver"} onClick={() => handleClick(mode)}>{name}</button>
    );
}