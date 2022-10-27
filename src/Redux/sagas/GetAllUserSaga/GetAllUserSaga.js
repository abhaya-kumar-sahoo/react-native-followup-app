import {call, put} from 'redux-saga/effects';
import {GetAllUsers} from 'ApiLogic/ApiCall';
import {setAllUser} from 'Redux/reducers/GetAllUserReducer/GetAllUser';

export function* GetAllUserSaga(action) {
  try {
    const res = yield call(GetAllUsers, action.token, action.data, action.text);

    yield put(
      setAllUser({
        data: res.data,
      }),
    );
  } catch (error) {
    yield put(
      setAllUser({
        data: [],
      }),
    );
  }
}
