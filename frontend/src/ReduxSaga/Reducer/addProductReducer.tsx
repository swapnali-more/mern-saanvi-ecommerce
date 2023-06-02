import { actionTypes } from "../../Utils/actionTypes";

const initialState = {
    productData: null,
    isLoading: false,
    error: null,
};
export const addProductReducer = (state = initialState, action: { type: any; payload: any; }) => {
    console.log("reducer", state.productData)
    switch (action.type) {
        case actionTypes.CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
                productData: action.payload.data,
                message: "Product created requested!"
            };
        case actionTypes.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                productData: action.payload.data,
                isLoading: false,
                error: null,
                message: "Product created successful!"
            };
        case actionTypes.CREATE_PRODUCT_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};