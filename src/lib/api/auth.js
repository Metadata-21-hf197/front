import axios from 'axios';


export const localRegister = ({username, password, email, userRole}) => axios.post('/user/join', { username, password, email, userRole });
export const localLogin = ({username, password}) => axios.post('/user/login', { username, password });

export const logout = () => axios.post('/user/logout');
