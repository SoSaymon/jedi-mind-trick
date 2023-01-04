import axios from 'axios';
import {setApiData, setApiError, setApiUrl, setApiDataAvailable} from "../game/slices/apiDataSlice";
export const fetchApiDataMiddleware = (store: any) => (next: any) => async (action: any) => {
    if (action.type === setApiUrl.type) {
        try {
            const res = await axios.get(action.payload);
            const data = res.data;
            store.dispatch(setApiData(data));
            console.log("Data", data);
        } catch (err) {
            store.dispatch(setApiError(err));
            console.log("Error", err);
        }
        if (store.getState().apiData.data !== '') {
            store.dispatch(setApiDataAvailable(true));
        }

    }
    return next(action);
}
