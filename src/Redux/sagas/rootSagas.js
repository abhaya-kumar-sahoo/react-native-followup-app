import {takeLatest} from 'redux-saga/effects';
import {GET_PROJECT} from 'Redux/reducers/Projects/ProjectsReducer';
import {GetAllProjectHandler} from './Projects/ProjectSaga';

export function* watcherSaga() {
  yield takeLatest(GET_PROJECT, GetAllProjectHandler);
}
