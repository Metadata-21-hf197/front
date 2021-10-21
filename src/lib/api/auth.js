import axios from 'axios';


export const localRegister = ({memberName, password, email, userRole}) => axios.post('/user/join', null ,{ memberName, password, email, userRole });
export const localLogin = ({username, password}) => axios.post('/user/login', { username, password });

export const logout = () => axios.post('/user/logout');
