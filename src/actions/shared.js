import { receiveUsers } from "../actions/users";
import { receiveQuestions } from "../actions/questions";
import { getInitialData } from "../utils/api";

export const handleInitialData = () => {
    return async (dispatch) => {
        // API call
        const { questions, users } = await getInitialData()
        // Update store
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
    }
}