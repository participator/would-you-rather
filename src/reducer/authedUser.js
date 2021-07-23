import { LOGIN_USER } from '../actions/authedUser'

const authedUser = (state = "", action) => {
    switch (action.type) {
        case LOGIN_USER:
            return action.authedUser
    
        default:
            return state
    }
}

export default authedUser