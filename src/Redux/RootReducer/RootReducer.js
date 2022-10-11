import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {AuthenticationReducer} from 'Redux/reducers/Authentication/AuthReducer';

export const RootReducer = combineReducers({
  UserAuth: AuthenticationReducer,
});
