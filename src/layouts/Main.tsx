import {Route, Routes} from "react-router-dom";
import {Home} from "../pages/Home";
import {GameSelect} from "../pages/GameSelect";
import {gameModes} from "../data/gameModes";

export const Main = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/game-select'} element={<GameSelect gameModes={gameModes}/>}/>
        </Routes>
    );
}