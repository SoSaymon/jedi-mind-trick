import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes, faForward} from "@fortawesome/free-solid-svg-icons";

interface ScoreMarkProps {
    scored: string;
}
export const ScoreMark = ({scored}: ScoreMarkProps) => {
    return (
        <div className={"flex justify-center items-center w-24 h-24 mx-auto my-2.5 rounded-3xl bg-white"}>
            <FontAwesomeIcon icon={scored === "true" ? faCheck : scored === "skip" ? faForward : faTimes} className={`${scored === "true" ? "text-green" : scored === "skip" ? "text-black" : "text-coral-red"} ${scored !== "skip" ? "w-20 h-20" : "w-16 h-16"}`}/>
        </div>
    );
}