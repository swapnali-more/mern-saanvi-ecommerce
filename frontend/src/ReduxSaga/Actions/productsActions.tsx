import { actionTypes } from "../../Utils/actionTypes"

export const fetchProductsRequest = (method: string) => ({
    type: actionTypes.FETCH_PRODUCTS_REQUEST,
    payload: {method}
})

export const fetchProductsSuccess = (data: any) => ({
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: data
})

export const fetchProductsFailure = (err: any) => ({
    type: actionTypes.FETCH_PRODUCTS_FAILURE,
    payload: err
})


export const fetchProductDetailRequest = (id: any, method: string) => ({
    type: actionTypes.FETCH_PRODUCT_DETAIL_REQUEST,
    payload: {id, method}
})

export const fetchProductDetailSuccess = (data: any) => ({
    type: actionTypes.FETCH_PRODUCT_DETAIL_SUCCESS,
    payload: data
})

export const fetchProductDetailFailure = (err: any) => ({
    type: actionTypes.FETCH_PRODUCT_DETAIL_FAILURE,
    payload: err
})