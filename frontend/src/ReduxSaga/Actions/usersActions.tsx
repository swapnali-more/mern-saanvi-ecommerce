import { actionTypes } from "../../Utils/actionTypes"

export const fetchUsersRequest = (method: string) => ({
    type: actionTypes.FETCH_USERS_REQUEST,
    payload: {method}
})

export const fetchUsersSuccess = (data: any) => ({
    type: actionTypes.FETCH_USERS_SUCCESS,
    payload: data
})

export const fetchUsersFailure = (err: any) => ({
    type: actionTypes.FETCH_USERS_FAILURE,
    payload: err
})


export const fetchUserDetailRequest = (id: any, method: string) => ({
    type: actionTypes.FETCH_USER_DETAIL_REQUEST,
    payload: {id, method}
})

export const fetchUserDetailSuccess = (data: any) => ({
    type: actionTypes.FETCH_USER_DETAIL_SUCCESS,
    payload: data
})

export const fetchUserDetailFailure = (err: any) => ({
    type: actionTypes.FETCH_USER_DETAIL_FAILURE,
    payload: err
})