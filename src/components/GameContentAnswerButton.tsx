interface GameContentAnswerButtonProps {
    answer: any;
    isAnswerSelected: boolean;
    isCorrect: boolean;

    handleAnswerClick: (isCorrect: boolean) => void;
}

export const GameContentAnswerButton = ({answer, isAnswerSelected, isCorrect, handleAnswerClick}: GameContentAnswerButtonProps) => {
    const isCorrectAnswer = answer.isCorrect;
    const isAnswerSelectedLocal = isAnswerSelected;
    const bgColor = "bg-light-silver";
    return (
        <button className={"flex justify-center items-center w-full h-20 rounded-full mb-5 text-xl font-medium duration-300 " + bgColor} onClick={() => handleAnswerClick(
            answer.correct === "true"
        )}>{answer.answer}</button>
    );
}