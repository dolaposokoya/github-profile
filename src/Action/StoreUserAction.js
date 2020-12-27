import { SUCCESS, CHECK_STORAGE, USER_EXIST } from "./ActionTypes";

export const storeUserAction = (user, callback) => {
    return dispatch => {
        const { id, avatar_url, name, repository } = user
        const users = JSON.parse(localStorage.getItem('users'))
        if (user.length <= 0) {
            dispatch({ type: CHECK_STORAGE })
            users.push({ id, avatar_url, name, repository })
            localStorage.setItem('users', JSON.stringify(users))
            callback({ success: true, data: users, message: 'User Added' })
        }
        else if (users.length > 0) {
            users.forEach(item => {
                if (item.id === id) {
                    dispatch({ type: USER_EXIST })
                    callback({ success: true, data: users, message: 'User Exist' })
                }
                else {
                    dispatch({ type: SUCCESS })
                    users.push({ id, avatar_url, name, repository })
                    localStorage.setItem('users', JSON.stringify(users))
                    callback({ success: true, data: users, message: 'User Added' })
                }
            })
        }
    }
}