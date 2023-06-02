import { actionTypes } from "../../Utils/actionTypes";

const initialState = {
    users: [],
    isLoading: false,
    error: null,
};
export const usersReducer = (state = initialState, action: { type: any; payload: any; }) => {
    console.log(state)
    switch (action.type) {
        case actionTypes.FETCH_USERS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case actionTypes.FETCH_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload,
                isLoading: false,
                error: null
            };
        case actionTypes.FETCH_USERS_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};