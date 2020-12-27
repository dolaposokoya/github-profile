import getUserReducer from "./GetUserReducer";
import storeUserReducer from "./GetUserReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    getUserReducer,
    storeUserReducer
});

export default allReducers;