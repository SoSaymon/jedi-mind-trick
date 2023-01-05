import {Route, Routes} from "react-router-dom";
import {Home} from "../pages/Home";
import {GameSelect} from "../pages/GameSelect";
import {gameModes} from "../data/gameModes";
import {Game} from "../pages/Game";
import React from "react";
import {GameFinal} from "../pages/GameFinal";

export const Main = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/game-select'} element={<GameSelect gameModes={gameModes}/>}/>
            <Route path={'/game'} element={<Game/>}/>
            <Route path={'/results'} element={<GameFinal/>}/>
        </Routes>
    );
}