import { actionTypes } from "../../Utils/actionTypes";

const initialState = {
    userData: null,
    isLoading: false,
    error: null,
};
export const loginUserReducer = (state = initialState, action: { type: any; payload: any; }) => {
    console.log("reducer", state.userData)
    const {type, payload} = action;
    switch (type) {
        case actionTypes.LOGIN_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                userData: payload.data,
                message: "User login requested!"
            };
        case actionTypes.LOGIN_USER_SUCCESS:
            localStorage.setItem('profile', JSON.stringify(payload))
            return {
                ...state,
                userData: payload.data,
                isLoading: false,
                error: null,
                message: "User login successful!"
            };
        case actionTypes.LOGIN_USER_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false,
            };
        default:
            return state;
    }
};