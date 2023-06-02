import { call, put, takeLatest } from "redux-saga/effects"
import { fetchUsersSuccess, fetchUsersFailure, fetchUserDetailSuccess, fetchUserDetailFailure } from '../Actions/usersActions';
import { apiCall } from '../../Api/Api';
import { actionTypes } from "../../Utils/actionTypes";
import { API_BASE_URL } from "../../config";

function* fetchUsersSaga(action: any): Generator<any, any, any> {
    try {
        const { method } = action.payload
        const data = yield call(apiCall, `${API_BASE_URL}/users`, {}, method);
        //console.log(data, method)
        yield put(fetchUsersSuccess(data))
    } catch (error) {
        yield put(fetchUsersFailure(error))
    }
}

function* fetchUserDetailSaga(action: any): Generator<any, any, any> {
    console.log("fetch detail", action.payload)
    try {
        const { id, method } = action.payload
        const data = yield call(apiCall, `${API_BASE_URL}/users/${id}`, {}, method);
        console.log(data, id, method, "detail")
        yield put(fetchUserDetailSuccess(data))
    } catch (error) {
        yield put(fetchUserDetailFailure(error))
    }
}

export function* watchFetchUsers() {
    yield takeLatest(actionTypes.FETCH_USERS_REQUEST, fetchUsersSaga);
}

export function* watchFetchUserDetail() {
    yield takeLatest(actionTypes.FETCH_USER_DETAIL_REQUEST, fetchUserDetailSaga);
}