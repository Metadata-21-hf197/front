import axios from 'axios';


export const localRegister = ({memberName, password, email, userRole}) => axios.post('/user/join', null, { 
    params: {
        'memberName': memberName,
        'password': password,
        'email': email,
        'userRole': userRole
    }
});
export const localLogin = ({username, password}) => axios.post('/user/login', null, { 
    params: {
    'username': username,
    'password': password
    }
});

export const logout = () => axios.post('/user/logout');
