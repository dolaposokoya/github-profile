import { SUCCESS, CHECK_STORAGE, USER_EXIST } from "./ActionTypes";

export const storeUserAction = (user,users, callback) => {
    return dispatch => {
        if (users === null || users === undefined || users.length === 0) {
            users.push(user)
            localStorage.setItem('users', JSON.stringify(users))
            dispatch({ type: CHECK_STORAGE, payload: user })
            callback({ success: true, data: user, message: 'User Added' })
        }
        else if (users.length > 0) {
            users.forEach(item => {
                if (item.id === user.id) {
                    dispatch({ type: USER_EXIST, payload: user })
                    callback({ success: false, data: user, message: 'User Present' })
                }
                else {
                    users.push(user)
                    localStorage.setItem('users', JSON.stringify(users))
                    dispatch({ type: SUCCESS, payload: user })
                    callback({ success: true, data: user, message: 'User Added' })
                }
            })
        }
    }
}