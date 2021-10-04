import React, { useState } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import Axios from 'axios';

function Register ({history}) {

    const [memberName, setMemberName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const [userRole, setUserRole] = useState();

    const onClickJoin = () => {
        Axios.post('/user/join').then((response) => {
          if(response.data){
            console.log(response.data);
            // 현재 응답값은 널.
            history.push('/user/login');
          } else {
            console.log('fail');
          }
        });
    }

        return (
            <AuthContent title="회원가입">
                <InputWithLabel label="아이디" value={memberName} name="memberName" placeholder="아이디"/>
                <InputWithLabel label="비밀번호" value={password} name="password" placeholder="비밀번호" type="password"/>
                <InputWithLabel label="비밀번호 확인" name="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
                <InputWithLabel label="이메일" value={email} name="email" placeholder="이메일"/>
                <InputWithLabel label="직무" value={userRole} name="role" placeholder="직무"/>
                <AuthButton onClick={onClickJoin}>회원가입</AuthButton>
                <RightAlignedLink to="/user/login">로그인</RightAlignedLink>
            </AuthContent>
        );
    
}

export default Register;