// 모듈을 위한 인덱스 파일
import { combineReducers } from 'redux';
import base from './base';
import user from './user';

import { penderReducer } from 'redux-pender';
export default combineReducers({
    base,
    user,
    pender: penderReducer
});