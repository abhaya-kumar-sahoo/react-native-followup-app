import {call, put} from 'redux-saga/effects';
import {setAllProjects} from 'Redux/reducers/Projects/ProjectsReducer';
import {AddProjectApiCall, GetProjectApiCall} from './request';

export function* GetAllProjectHandler(action) {
  try {
    const response = yield call(GetProjectApiCall, action.data);

    yield put(setAllProjects({data: response.data}));
  } catch (error) {
    yield put(setAllProjects({data: []}));
  }
}

// export function* AddProjectHandler(action) {
//   try {
//     const res = yield call(AddProjectApiCall, action.data);
//   } catch (error) {}
// }
