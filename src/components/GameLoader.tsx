import {FillCircleLoader} from "react-loaders-kit";

export const GameLoader = () => {
    const loaderProps = {
        loading: true,
        size: 50,
        duration: 1,
        circleColor: "#F2F2F2",
    }
    return (
        <div className={"flex flex-col justify-center items-center w-full min-h-screen loader"}>
            <FillCircleLoader {...loaderProps} />
        </div>
    );
}