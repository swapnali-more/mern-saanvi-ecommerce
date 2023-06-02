import { actionTypes } from "../../Utils/actionTypes"

export const createProductRequest = (method: string, data: any) => ({
    type: actionTypes.CREATE_PRODUCT_REQUEST,
    payload: {method, data}
})

export const createProductSuccess = (data: any) => ({
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
    payload: data
})

export const createProductFailure = (err: any) => ({
    type: actionTypes.CREATE_PRODUCT_FAILURE,
    payload: err
})