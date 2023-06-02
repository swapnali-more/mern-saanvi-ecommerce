import { call, put, takeLatest } from "redux-saga/effects"
import { apiCall } from '../../Api/Api';
import { actionTypes } from "../../Utils/actionTypes";
import { API_BASE_URL } from "../../config";
import { loginUserSuccess, loginUserFailure } from "../Actions/loginUserActions";

function* loginUserSaga(action: any): Generator<any, any, any> {
    console.log("saga", action)
    try {
        const { method, data } = action.payload
        const res = yield call(apiCall, `${API_BASE_URL}/users/login-user`, data, method);
        yield put(loginUserSuccess(res))
    } catch (error) {
        yield put(loginUserFailure(error))
    }
}

export function* watchLoginUser() {
    yield takeLatest(actionTypes.LOGIN_USER_REQUEST, loginUserSaga);
}