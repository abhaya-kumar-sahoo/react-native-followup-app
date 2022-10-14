import {RootReducer} from 'Redux/RootReducer/RootReducer';
import createSagaMiddleware from 'redux-saga';
import {watcherSaga} from 'Redux/sagas/rootSagas';

const {createStore, applyMiddleware} = require('redux');

const sagaMiddleWare = createSagaMiddleware();
const middleWare = [sagaMiddleWare];

const store = createStore(RootReducer, applyMiddleware(...middleWare));

sagaMiddleWare.run(watcherSaga);

export {store};
