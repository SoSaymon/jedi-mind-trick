interface GameContentSubmitButtonProps {
    isAnswerSelected: boolean;
    isSubmitted: boolean;
    handleButtonClick: (mode: string) => void;
}

export const GameContentSubmitButton = ({isAnswerSelected, isSubmitted, handleButtonClick}: GameContentSubmitButtonProps) => {
    const bgColor = isAnswerSelected ? "bg-green" : "bg-coral-red";
    const mode = isAnswerSelected ? isSubmitted ? "next" : "submit" : "skip";
    return (
        <button className={"flex justify-center items-center w-3/5 h-full rounded-full text-2xl font-bold text-white " + bgColor} onClick={() => handleButtonClick(mode)}>{
            isAnswerSelected ?
                isSubmitted ?
                    "Next" : "Submit"
                : "Skip"
        }
        </button>
    );
}