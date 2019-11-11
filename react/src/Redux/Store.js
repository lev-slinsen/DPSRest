import {applyMiddleware, combineReducers, createStore} from "redux";
import listsReducer from "./pizzasReducer";
import { reducer as formReducer } from "redux-form";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const persistedState = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order')) : {};

const combinedReducers = combineReducers({
    reducer: listsReducer,
    form: formReducer,
});

const store = createStore(combinedReducers, persistedState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

store.subscribe(()=>{
    let orderStorage = {
        order: store.getState().reducer.order,
        totalPrice: store.getState().reducer.totalPrice,
        totalQuantity: store.getState().reducer.totalQuantity,
    };
    localStorage.setItem('order', JSON.stringify(orderStorage))
});

export default store;