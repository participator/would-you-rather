export const RECEIVE_USERS = "RECEIVE_USERS"
export const SAVE_USER_QUESTION_ASKED = "SAVE_USER_QUESTION_ASKED"
export const SAVE_USER_QUESTION_ANSWER = 'SAVE_USER_QUESTION_ANSWER'

export const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

export const saveUserQuestionAsked = (authedUser, questionId) => ({
    type: SAVE_USER_QUESTION_ASKED,
    authedUser,
    questionId
})

export const saveUserQuestionAnswer = (authedUser, answer, questionId) => ({
    type: SAVE_USER_QUESTION_ANSWER,
    answer,
    authedUser,
    questionId
})