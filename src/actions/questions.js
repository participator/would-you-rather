export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const SAVE_QUESTION = 'SAVE_QUESTION'
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER'

export const receiveQuestions = (questions) => ({
    type: RECEIVE_QUESTIONS,
    questions
})

export const saveQuestion = (authedUser, question, questions) => ({
    type: SAVE_QUESTION,
    authedUser,
    question,
    questions
})

export const saveQuestionAnswer = (authedUser, questionId, answer) => ({
    type: SAVE_QUESTION_ANSWER,
    authedUser,
    questionId,
    answer
})