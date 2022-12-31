import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

interface ScoreMarkProps {
    questionNumber: number;
    scored: boolean;
}
export const ScoreMark = ({questionNumber, scored}: ScoreMarkProps) => {
    return (
        <div className={"flex justify-center items-center w-24 h-24 mx-auto my-2.5 rounded-3xl bg-white"}>
            <FontAwesomeIcon icon={scored ? faCheck : faTimes} className={`${scored ? "text-green" : "text-coral-red"} w-20 h-20`}/>
        </div>
    );
}