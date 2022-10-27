import {GetPostApi} from 'ApiLogic/ApiCall';
import {call, put} from 'redux-saga/effects';
import {setPosts} from 'Redux/reducers/PostReducer/PostReducer';

export function* GetPostsHandler(action) {
  try {
    const response = yield call(
      GetPostApi,
      action.token,
      action.project_id,
      action.date,
    );
    yield put(setPosts({data: response.data}));
  } catch (error) {
    yield put(setPosts({data: []}));
  }
}
