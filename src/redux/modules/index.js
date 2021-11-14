// 모듈을 위한 인덱스 파일
import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './users';


import { penderReducer } from 'redux-pender';
export default combineReducers({
    base,
    auth,
    user,
    pender: penderReducer
});