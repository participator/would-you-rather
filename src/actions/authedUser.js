export const LOGIN_USER = 'LOGIN_USER'
export const LOGOFF_USER = 'LOGOFF_USER'

const setAuthedUser = (authedUser) => ({
    type: LOGIN_USER,
    authedUser
})

const unsetAuthedUser = () => ({
    type: LOGOFF_USER,
    authedUser: ''
})

export const handleSetAuthedUser = (authedUser) => (dispatch) => {
    dispatch(setAuthedUser(authedUser))
}

export const handleUnsetAuthedUser = () => (dispatch) => {
    dispatch(unsetAuthedUser())
}