import React, { useState } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import Axios from 'axios';
import axios from 'axios';

function Register ({history}) {

    const [memberName, setMemberName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [userRole, setUserRole] = useState();

    const handleID = (e) => {
      setMemberName(e.target.value);
    }
    const handlePw = (e) => {
      setPassword(e.target.value);
    }
    const handleEm = (e) => {
      setEmail(e.target.value);
    }

    const onClickJoin = () => {
        axios.post('/user/join', null, {
          params: {
            'membername': memberName,
            'password': password,
            'email': email 
          }
        })
        .then(res => {
          console.log(res);
          history.push('/user/login');
        })
        .catch((error) => {
          alert('회원가입 실패');
          setMemberName('');
          setPassword('');
          setEmail('');
        })
    }

        return (
            <AuthContent title="회원가입">
              <form action="/user/join" method="post">
                <InputWithLabel label="아이디" value={memberName} onChange={handleID} name="memberName" placeholder="아이디"/>
                <InputWithLabel label="비밀번호" value={password} onChange={handlePw} name="password" placeholder="비밀번호" type="password"/>
                <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
                <InputWithLabel label="이메일" value={email} onChange={handleEm} name="email" placeholder="이메일"/>
                <InputWithLabel label="직무" value={userRole} name="role" placeholder="직무"/>
              </form>
                <AuthButton onClick={onClickJoin}>회원가입</AuthButton>
                <RightAlignedLink to="/user/login">로그인</RightAlignedLink>
            </AuthContent>
        );
    
}

export default Register;