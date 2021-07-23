import { receiveUsers } from "../actions/users";
import { getInitialData } from "../utils/api";

export const handleInitialData = () => {
    return async (dispatch) => {
        const { questions, users } = await getInitialData()
        dispatch(receiveUsers(users))
    }
}