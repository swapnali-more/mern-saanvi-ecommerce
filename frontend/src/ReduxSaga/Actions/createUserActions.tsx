import { actionTypes } from "../../Utils/actionTypes"

export const createUserRequest = (method: string, data: any) => ({
    type: actionTypes.CREATE_USER_REQUEST,
    payload: {method, data}
})

export const createUserSuccess = (data: any) => ({
    type: actionTypes.CREATE_USER_SUCCESS,
    payload: data
})

export const createUserFailure = (err: any) => ({
    type: actionTypes.CREATE_USER_FAILURE,
    payload: err
})