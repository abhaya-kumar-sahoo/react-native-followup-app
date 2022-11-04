import {call, put} from 'redux-saga/effects';
import {AddChatApi, GetChatApi} from 'ApiLogic/ApiCall';
import {setAllUser} from 'Redux/reducers/GetAllUserReducer/GetAllUser';
import {setChats} from 'Redux/reducers/ChatReducer/ChatReducer';

export function* GetChatsSaga(action) {
  try {
    const res = yield call(GetChatApi, action.token, action.project_id);

    yield put(
      setChats({
        data: res.data,
      }),
    );
  } catch (error) {
    yield put(
      setChats({
        data: [],
      }),
    );
  }
}
