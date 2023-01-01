import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";


interface GameModeState {
    gameMode: string;
}

const initialState: GameModeState = {
    gameMode: ""
}
export const gameModeSlice = createSlice({
    name: "gameMode",
    initialState,
    reducers: {
        setGameMode: (state, action: PayloadAction<string>) => {
            state.gameMode = action.payload;
        }
    }
});

export const {setGameMode} = gameModeSlice.actions;
export const selectGameMode = (state: RootState) => state.gameMode.gameMode;
export default gameModeSlice.reducer;