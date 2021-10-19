import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import * as AuthAPI from '../../lib/api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'; // form 초기화

const LOCAL_REGISTER = 'auth/LOCAL_REGISTER'; // 이메일 가입
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN'; // 이메일 로그인

const LOGOUT = 'auth/LOGOUT'; // 로그아웃

export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const initializeForm = createAction(INITIALIZE_FORM); // form 
export const localRegister = createAction(LOCAL_REGISTER, AuthAPI.localRegister); // { memberName, password, email, userRole }
export const localLogin = createAction(LOCAL_LOGIN, AuthAPI.localLogin); // { username, password }

export const logout = createAction(LOGOUT, AuthAPI.logout);
const initialState = Map({
    register: Map({
        form: Map({
            memberName: '',
            password: '',
            passwordConfirm: '',
            email: '',
            userRole: '',
        })
    }),
    login: Map({
        form: Map({
            username: '',
            password: ''
        })
    }),
    result: Map({})
});

export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    ...pender({
        type: LOCAL_LOGIN,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
    ...pender({
        type: LOCAL_REGISTER,
        onSuccess: (state, action) => state.set('result', Map(action.payload.data))
    }),
}, initialState);