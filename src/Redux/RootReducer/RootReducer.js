import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {AuthenticationReducer} from 'Redux/reducers/Authentication/AuthReducer';
import {ProjectReducer} from 'Redux/reducers/Projects/ProjectsReducer';
import {GetAllUserReducer} from 'Redux/reducers/GetAllUserReducer/GetAllUser';
import {GetPostsReducer} from 'Redux/reducers/PostReducer/PostReducer';
import {GetAllChatsReducer} from 'Redux/reducers/ChatReducer/ChatReducer';
export const RootReducer = combineReducers({
  UserAuth: AuthenticationReducer,
  ProjectReducer,
  GetAllUserReducer,
  GetPostsReducer,
  GetAllChatsReducer,
});
