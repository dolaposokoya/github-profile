import { REQUEST_FAILED, SUCCESS, REQUEST_USER } from "../Action/ActionTypes";

const initial_state = {
    userData: []
}
const getUserReducer = (state = initial_state, action) => {
    switch (action.types) {
        case REQUEST_USER:
            return {
                ...state
            }
        case REQUEST_FAILED:
            return state
        case SUCCESS:
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state
    }
}

export default getUserReducer;