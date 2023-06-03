import { actionTypes } from "../../Utils/actionTypes";

const initialState = {
    userData: null,
    isLoading: false,
    error: null,
    message: '',
    logoutMsg: '',
    isLoggedIn: false,
};
export const logInOutUserReducer = (state = initialState, action: { type: any; payload: any; }) => {
    console.log("reducer", state.userData)
    const { type, payload } = action;
    switch (type) {
        case actionTypes.LOGIN_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                userData: payload.data,
                message: "User login requested!",
                isLoggedIn: false
            };
        case actionTypes.LOGIN_USER_SUCCESS:
            localStorage.setItem('profile', JSON.stringify(payload))
            return {
                ...state,
                userData: payload.data,
                isLoading: false,
                error: null,
                isLoggedIn: true,
                message: "User login successful!"
            };
        case actionTypes.LOGIN_USER_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false,
                isLoggedIn: false,
                message: 'Something went wrong!'
            };
        case actionTypes.LOGOUT_USER_SUCCESS:
            localStorage.clear()
            return {
                ...state,
                userData: null,
                error: null,
                isLoading: false,
                isLoggedIn: false,
                logoutMsg: 'User logout successful!'
            };
        case actionTypes.LOGOUT_USER_FAILURE:
            return {
                ...state,
                error: payload,
                isLoading: false,
                isLoggedIn: false,
                logoutMsg: 'Something went wrong!'
            }
        default:
            return state;
    }
};