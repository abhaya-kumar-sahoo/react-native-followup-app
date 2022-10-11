import {RootReducer} from 'Redux/RootReducer/RootReducer';

const {createStore} = require('redux');

export const store = createStore(RootReducer);
