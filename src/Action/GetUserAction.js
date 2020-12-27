import { REQUEST_FAILED, SUCCESS, REQUEST_USER } from "./ActionTypes";

export const getUserAction = (callback) => {
    return dispatch => {
        try {
            if (localStorage.getItem('users') === null) {
                dispatch({ type: REQUEST_USER })
                callback({ success: true, users: [] })
            }
            else {
                let users = JSON.parse(localStorage.getItem('users'))
                dispatch({ type: SUCCESS })
                callback({ success: true, users: users })
            }
        }
        catch (error) {
            dispatch({ type: REQUEST_FAILED })
            callback({ success: false, message: error.message })
        }
    }
}