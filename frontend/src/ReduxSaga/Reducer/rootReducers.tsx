import { combineReducers } from "redux";
import { productsReducer } from "./productsReducer";
import { addProductReducer } from "./addProductReducer";
import { productCartReducer } from "./productCartReducer";
import { productDetailReducer } from "./productDetailReducer";
import { createUserReducer } from "./createUserReducer";
import { usersReducer } from "./usersReducer";
import { logInOutUserReducer } from "./logInOutUserReducer";

const rootReducers = combineReducers({
    products: productsReducer,
    addProduct: addProductReducer,
    productCart: productCartReducer,
    productDetail: productDetailReducer,
    users: usersReducer,
    createUser: createUserReducer,
    logInOutUser: logInOutUserReducer,
})

export default rootReducers