import { userReducer } from "./Reducer";
import {createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const AuthStore=createStore(userReducer,applyMiddleware(thunk));