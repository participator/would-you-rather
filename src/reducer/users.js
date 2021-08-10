import { 
    RECEIVE_USERS,
    SAVE_USER_QUESTION_ASKED,
    SAVE_USER_QUESTION_ANSWER,
} from "../actions/users"

const users = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USERS: {
            return {
                ...state,
                ...action.users
            }
        }
        case SAVE_USER_QUESTION_ASKED: {
            const { authedUser, id: questionId } = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: [...state[authedUser].questions, questionId]
                }
            }
        }
        case SAVE_USER_QUESTION_ANSWER: {
            const { authedUser, questionId, answer } = action
            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [answer]: questionId
                    }
                }
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default users