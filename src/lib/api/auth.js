import axios from 'axios';

export const localRegister = ({username, password, email}) => axios.post('/user/join', { username, password, email });
export const localLogin = ({username, password}) => axios.post('/user/login', { username, password });
