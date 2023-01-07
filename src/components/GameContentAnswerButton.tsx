interface GameContentAnswerButtonProps {
    index: number;
    answer: any;
    handleAnswerClick: (isCorrect: boolean, index: number) => void;
}

export const GameContentAnswerButton = ({index ,answer, handleAnswerClick}: GameContentAnswerButtonProps) => {
    return (
        <button id={`answer${index}`} className={"flex justify-center items-center w-full h-20 rounded-full mb-5 text-xl font-medium duration-300 bg-light-silver"} onClick={() => handleAnswerClick(
            answer.correct === "true",
            index
        )}>{answer}</button>
    );
}