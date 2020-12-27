import { SUCCESS, REQUEST_USER } from "../Action/ActionTypes";

const initial_state = {
    users: []
}
const getUserReducer = (state = initial_state, action) => {
    switch (action.types) {
        case SUCCESS:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}

export default getUserReducer;