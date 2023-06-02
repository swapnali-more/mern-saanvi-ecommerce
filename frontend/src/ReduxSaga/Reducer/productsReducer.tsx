import { actionTypes } from "../../Utils/actionTypes";

const initialState = {
    products: [],
    isLoading: false,
    error: null,
};
export const productsReducer = (state = initialState, action: { type: any; payload: any; }) => {
    console.log(state)
    switch (action.type) {
        case actionTypes.FETCH_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case actionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                isLoading: false,
                error: null
            };
        case actionTypes.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            };
        default:
            return state;
    }
};