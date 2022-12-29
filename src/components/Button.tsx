interface ButtonProps {
    width: string;
    radius: string;
    bg: string;
    bem: string;
    text: string;
    onClick: () => void;
}
export const Button = ({width, radius, bg, bem, text, onClick}: ButtonProps) => {
    return (
        <button className={`flex justify-center items-center ${width} ${radius} ${bg} ${bem}`} onClick={onClick}>
            <p className={"text-white text-lg font-bold px-5 py-2.5"}>{text}</p>
        </button>
    );
}