import React, { useState } from 'react';
import { AuthButton, AuthContent,InputWithLabel, RightAlignedLink } from '../../components/Auth';
import Axios from 'axios';
import axios from 'axios';
function Login ({history}) {

    const [username, setMemberName] = useState();
    const [password, setPassword] = useState();
    const authenticated = username != null;
    
    const handleID = (e) => {
      setMemberName(e.target.value)
    }
    const handlePw = (e) => {
      setPassword(e.target.value)
    }
   
    const onClickLogin = () => {
      axios.post('/user/login', null, {
        params: {
          'username': username,
          'password': password
        }
      })
      .then(res => {
        console.log(res);
        history.push('/table/word');
      })
      .catch((error) => {
        alert('로그인 실패');
        setMemberName('');
        setPassword('');
      })
    }

        return (
            <AuthContent title="로그인">
                <form action="/user/login" method="post">
                  <InputWithLabel label="아이디" value={username} onChange={handleID} name="username" placeholder="아이디"/>
                  <InputWithLabel label="비밀번호" value={password} onChange={handlePw} name="password" placeholder="비밀번호" type="password"/>
                  <AuthButton onClick={onClickLogin}>로그인</AuthButton>
                </form>
                <RightAlignedLink to="/user/join">회원가입</RightAlignedLink>
            </AuthContent>
        );
}

export default Login;