import { actionTypes } from "../../Utils/actionTypes";

const initialState = {
    productDetail: [],
    isLoading: false,
    error: null,
};
export const productDetailReducer = (state = initialState, action: { type: any; payload: any; }) => {
    console.log(state, action.payload)
    switch (action.type) {

        case actionTypes.FETCH_PRODUCT_DETAIL_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case actionTypes.FETCH_PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                productDetail: action.payload,
                isLoading: false,
                error: null
            };
        case actionTypes.FETCH_PRODUCT_DETAIL_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};