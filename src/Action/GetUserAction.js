import { REQUEST_FAILED, SUCCESS } from "./ActionTypes";

export const getUserAction = (callback) => {
    return dispatch => {
        try {
            let users;
            if (localStorage.getItem('users') === null) {
                dispatch({ type: SUCCESS, payload: [] })
                callback({ success: true, users: [] })
            }
            else {
                users = JSON.parse(localStorage.getItem('users'))
                dispatch({ type: SUCCESS, payload: users })
                callback({ success: true, users: users})
            }
        }
        catch (error) {
            dispatch({ type: REQUEST_FAILED, payload: [] })
            callback({ success: false, message: error.message })
        }
    }
}