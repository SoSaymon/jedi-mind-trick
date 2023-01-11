import axios from 'axios';
import {
    setApiData,
    setApiDataAvailable,
    setApiError,
    setApiUrl,
    setNumberOfPossibleData
} from "../game/slices/apiDataSlice";

export const fetchApiDataMiddleware = (store: any) => (next: any) => async (action: any) => {
    if (action.type === setApiUrl.type) {
        try {
            const res = await axios.get(action.payload);
            const data = res.data.count;
            store.dispatch(setNumberOfPossibleData(data));
            const numberOfPossibleData = store.getState().apiData.numberOfPossibleData;
            if (numberOfPossibleData !== 0) {
                for (let i = 1; i <= numberOfPossibleData; i++) {
                    try {
                        const res = await axios.get(action.payload + i);
                        const data = res.data;
                        store.dispatch(setApiData(data));
                    } catch (err) {
                        store.dispatch(setApiError(err));
                    }
                }
                if (store.getState().apiData.data !== '') {
                    store.dispatch(setApiDataAvailable(true));
                }
            }
        } catch (e) {
            store.dispatch(setApiError(e));
        }
    }
    return next(action);
}
