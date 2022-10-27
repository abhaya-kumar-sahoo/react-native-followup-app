import {takeLatest} from 'redux-saga/effects';
import {GET_USER_DETAILS} from 'Redux/reducers/Authentication/AuthReducer';
import {GET_ALL_USER} from 'Redux/reducers/GetAllUserReducer/GetAllUser';
import {GET_POSTS} from 'Redux/reducers/PostReducer/PostReducer';
import {GET_PROJECT} from 'Redux/reducers/Projects/ProjectsReducer';

import {GetUserDetailsSaga} from './Authentication/AuthSaga';
import {GetAllUserSaga} from './GetAllUserSaga/GetAllUserSaga';
import {GetPostsHandler} from './PostSaga/PostSaga';
import {GetAllProjectHandler} from './Projects/ProjectSaga';

export function* watcherSaga() {
  yield takeLatest(GET_PROJECT, GetAllProjectHandler);
  yield takeLatest(GET_ALL_USER, GetAllUserSaga);
  yield takeLatest(GET_USER_DETAILS, GetUserDetailsSaga);
  yield takeLatest(GET_POSTS, GetPostsHandler);
}
