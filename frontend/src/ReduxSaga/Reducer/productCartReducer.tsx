import { actionTypes } from "../../Utils/actionTypes";

interface ProductCart {
    product: any;
    quantity: number;
}

interface ProductCartState {
    productCart: ProductCart[];
    isLoading: boolean;
    error: any;
}
const storedProductCart = localStorage.getItem("productCart");
const initialState: ProductCartState = {
    productCart: storedProductCart ? JSON.parse(storedProductCart) : [],
    isLoading: false,
    error: null,
};
export const productCartReducer = (state = initialState, action: { type: any; payload: any; }): ProductCartState => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT_TO_CART:
            const existingProductIndex = state.productCart.findIndex((product) => product.product.productId === action.payload.productId)
            if (existingProductIndex >= 0) {
                const updatedProductCart = [...state.productCart];
                updatedProductCart[existingProductIndex].quantity += 1;
                localStorage.setItem("productCart", JSON.stringify(updatedProductCart));
                return {
                    ...state,
                    productCart: updatedProductCart,
                    error: null,
                    isLoading: false
                }
            } else {
                const updatedProductCart = [
                    ...state.productCart,
                    {
                        product: action.payload,
                        quantity: 1,
                    },
                ];
                localStorage.setItem("productCart", JSON.stringify(updatedProductCart));

                return {
                    ...state,
                    productCart: [...state.productCart, action.payload],
                    error: null,
                    isLoading: false,
                };
            }
        case actionTypes.DELETE_PRODUCT_FROM_CART:
            return {
                ...state,
                productCart: [...state.productCart, action.payload],
                error: null,
                isLoading: false,
            };
        default:
            return state;
    }
};