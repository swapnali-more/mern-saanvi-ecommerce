import { call, put, select, takeLatest } from "redux-saga/effects"
import { apiCall } from '../../Api/Api';
import { actionTypes } from "../../Utils/actionTypes";
import { API_BASE_URL } from "../../config";
import { createProductFailure, createProductSuccess } from "../Actions/addProductActions";

function* createProductSaga(action: any): Generator<any, any, any> {
    console.log("saga", action)
    try {
        const { method, data } = action.payload
        const res = yield call(apiCall, `${API_BASE_URL}/products`, data, method);
        yield put(createProductSuccess(res))
    } catch (error) {
        yield put(createProductFailure(error))
    }
}

export function* watchCreateProduct() {
    yield takeLatest(actionTypes.CREATE_PRODUCT_REQUEST, createProductSaga);
}