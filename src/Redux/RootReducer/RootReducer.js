import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {AuthenticationReducer} from 'Redux/reducers/Authentication/AuthReducer';
import {ProjectReducer} from 'Redux/reducers/Projects/ProjectsReducer';

export const RootReducer = combineReducers({
  UserAuth: AuthenticationReducer,
  ProjectReducer,
});
