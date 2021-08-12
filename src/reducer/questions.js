import { 
    RECEIVE_QUESTIONS,
    SAVE_QUESTION,
    SAVE_QUESTION_ANSWER
} from "../actions/questions";

const questions = (state = {}, action) => {
    const { type } = action

    switch (type) {
        case RECEIVE_QUESTIONS: {
            const { questions } = action
            return {
                ...state,
                ...questions
            }
        }
        case SAVE_QUESTION: {
            const { question } = action
            return {
                ...state,
                [question.id]: { ...question }
            }
        }
        case SAVE_QUESTION_ANSWER: {
            const { authedUser, questionId, answer } = action
            const authedUserQuestionAnswer = {
                ...state[questionId],
                [answer]: {
                    ...state[questionId][answer],
                    votes: [...state[questionId][answer]['votes'], authedUser]
                }
            }
            return {
                ...state,
                [questionId]: authedUserQuestionAnswer
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default questions