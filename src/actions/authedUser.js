export const LOGIN_USER = 'LOGIN_USER'

const setAuthedUser = (authedUser) => ({
    type: LOGIN_USER,
    authedUser
})

export const handleSetAuthedUser = (authedUser) => (dispatch) => {
    dispatch(setAuthedUser(authedUser))
}