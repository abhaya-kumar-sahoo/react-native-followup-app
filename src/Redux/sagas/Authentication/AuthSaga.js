import {call, put} from 'redux-saga/effects';
import {GetUserDetails} from 'ApiLogic/ApiCall';
import {setUserDetails} from 'Redux/reducers/Authentication/AuthReducer';

export function* GetUserDetailsSaga(action) {
  try {
    const res = yield call(GetUserDetails, action.data);
    yield put(
      setUserDetails({
        data: res.data,
      }),
    );
  } catch (error) {
    yield put(
      setUserDetails({
        data: {},
      }),
    );
  }
}
