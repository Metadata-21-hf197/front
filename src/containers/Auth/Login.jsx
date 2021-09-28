import React, { useState } from 'react';
import { AuthButton, AuthContent,InputWithLabel, RightAlignedLink } from '../../components/Auth';
import Axios from 'axios';
function Login ({history}) {

    const [username, setMemberName] = useState();
    const [password, setPassword] = useState();

    const onClickLogin = () => {
        Axios.post('/user/login').then((response) => {
          if(response.data){
            console.log(response.data);
            // 현재 응답값은 널.
            history.push('/table/word');
          } else {
            console.log('fail');
          }
        });
    }

    /*const handleLogin = () => {
        history.push('/table/word');
    };*/

        return (
            <AuthContent title="로그인">
                <form action="/user/login" method="post">
                <InputWithLabel label="아이디" value={username} name="username" placeholder="아이디"/>
                <InputWithLabel label="비밀번호" value={password} name="password" placeholder="비밀번호" type="password"/>
                </form>
                <AuthButton onClick={onClickLogin}>로그인</AuthButton>
                <RightAlignedLink to="/user/join">회원가입</RightAlignedLink>
            </AuthContent>
        );
}

export default Login;