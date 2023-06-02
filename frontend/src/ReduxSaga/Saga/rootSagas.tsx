import { all } from 'redux-saga/effects';
import { watchFetchProductDetail, watchFetchProducts } from './productsSaga';
import { watchCreateProduct } from './addProductSaga';
import { watchCreateUser } from './createUserSaga';
import { watchFetchUserDetail, watchFetchUsers } from './usersSaga';
import { watchLoginUser } from './loginUserSaga';

function* rootSagas() {
    yield all([
        watchFetchProducts(),
        watchCreateProduct(),
        watchFetchProductDetail(),
        watchFetchUsers(),
        watchFetchUserDetail(),
        watchCreateUser(),
        watchLoginUser(),
    ])
}

export default rootSagas