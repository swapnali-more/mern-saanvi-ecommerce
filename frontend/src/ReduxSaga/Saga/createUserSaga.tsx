import { call, put, takeLatest } from "redux-saga/effects"
import { apiCall } from '../../Api/Api';
import { actionTypes } from "../../Utils/actionTypes";
import { API_BASE_URL } from "../../config";
import { createUserFailure, createUserSuccess } from "../Actions/createUserActions";

function* createUserSaga(action: any): Generator<any, any, any> {
    console.log("saga", action)
    try {
        const { method, data } = action.payload
        const res = yield call(apiCall, `${API_BASE_URL}/users/register-user`, data, method);
        yield put(createUserSuccess(res))
    } catch (error) {
        yield put(createUserFailure(error))
    }
}

export function* watchCreateUser() {
    yield takeLatest(actionTypes.CREATE_USER_REQUEST, createUserSaga);
}