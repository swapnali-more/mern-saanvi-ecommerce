import { actionTypes } from "../../Utils/actionTypes"

export const addProductToCart = (data: any) => ({
    type: actionTypes.ADD_PRODUCT_TO_CART,
    payload: data
})

export const deleteProductFromCart = (data: any) => ({
    type: actionTypes.DELETE_PRODUCT_FROM_CART,
    payload: data
})