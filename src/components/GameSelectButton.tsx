interface GameSelectButtonProps {
    gameMode: string;
    onClick: () => void;
}
export const GameSelectButton = ({gameMode, onClick}: GameSelectButtonProps) => {
    return (
        // TODO: Add bem classnames
        <button className={"flex justify-center items-center w-full h-40 rounded-3xl mb-10 text-2xl font-bold bg-light-silver"} onClick={onClick}>{gameMode}</button>
    );
}