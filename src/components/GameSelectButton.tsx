import {useNavigate} from "react-router-dom";

interface GameSelectButtonProps {
    name: string;
    mode: string;
}
export const GameSelectButton = ({name, mode}: GameSelectButtonProps) => {

    const navigate = useNavigate();
    const handleClick = (mode: string) => {
        console.log("clicked", mode);
        //send the chosen mode to global state in redux
        navigate('/game');
    }
    return (
        // TODO: Add bem classnames
        <button className={"flex justify-center items-center w-full h-40 rounded-3xl mb-10 text-2xl font-bold bg-light-silver"} onClick={() => handleClick(mode)}>{name}</button>
    );
}