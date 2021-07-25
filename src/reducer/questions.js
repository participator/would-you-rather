import { RECEIVE_QUESTIONS } from "../actions/questions";

const questions = (state = {}, action) => {
    const { type, questions } = action

    switch (type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...questions
            }
    
        default:
            return {
                ...state
            }
    }
}

export default questions