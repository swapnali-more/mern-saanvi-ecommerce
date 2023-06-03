import { actionTypes } from "../../Utils/actionTypes"

export const loginUserRequest = (method: string, data: any) => ({
    type: actionTypes.LOGIN_USER_REQUEST,
    payload: {method, data}
})

export const loginUserSuccess = (data: any) => ({
    type: actionTypes.LOGIN_USER_SUCCESS,
    payload: data
})

export const loginUserFailure = (err: any) => ({
    type: actionTypes.LOGIN_USER_FAILURE,
    payload: err
})

export const logoutUserSuccess = () => ({
    type: actionTypes.LOGOUT_USER_SUCCESS
})

export const logoutUserFailure = (err: any) => ({
    type: actionTypes.LOGOUT_USER_FAILURE,
    payload: err
})