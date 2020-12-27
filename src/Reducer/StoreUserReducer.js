import { SUCCESS, CHECK_STORAGE, USER_EXIST } from "../Action/ActionTypes";

const initial_state = {
    user: {}
}

const storeUserReducer = (state = initial_state, action) => {
    switch (action.types) {
        case CHECK_STORAGE:
            return {
                ...state,
                user: action.payload
            }
        case USER_EXIST:
            return {
                ...state
            }
        case SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default storeUserReducer