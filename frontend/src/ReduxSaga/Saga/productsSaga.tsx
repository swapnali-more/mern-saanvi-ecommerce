import { call, put, takeLatest } from "redux-saga/effects"
import { fetchProductsSuccess, fetchProductsFailure, fetchProductDetailSuccess, fetchProductDetailFailure } from '../Actions/productsActions';
import { apiCall } from '../../Api/Api';
import { actionTypes } from "../../Utils/actionTypes";
import { API_BASE_URL } from "../../config";

function* fetchProductsSaga(action: any): Generator<any, any, any> {
    try {
        const { method } = action.payload
        const data = yield call(apiCall, `${API_BASE_URL}/products`, {}, method);
        //console.log(data, method)
        yield put(fetchProductsSuccess(data))
    } catch (error) {
        yield put(fetchProductsFailure(error))
    }
}

function* fetchProductDetailSaga(action: any): Generator<any, any, any> {
    console.log("fetch detail", action.payload)
    try {
        const { id, method } = action.payload
        const data = yield call(apiCall, `${API_BASE_URL}/products/${id}`, {}, method);
        console.log(data, id, method, "detail")
        yield put(fetchProductDetailSuccess(data))
    } catch (error) {
        yield put(fetchProductDetailFailure(error))
    }
}

export function* watchFetchProducts() {
    yield takeLatest(actionTypes.FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}

export function* watchFetchProductDetail() {
    yield takeLatest(actionTypes.FETCH_PRODUCT_DETAIL_REQUEST, fetchProductDetailSaga);
}