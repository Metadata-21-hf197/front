import React, { Component } from 'react';
import { AuthButton, AuthContent,InputWithLabel, RightAlignedLink } from '../../components/Auth';

function Login ({history}) {

    const handleLogin = () => {
        history.push('/main');
    }
        return (
            <AuthContent title="로그인">
                <InputWithLabel label="이메일" name="email" placeholder="이메일"/>
                <InputWithLabel label="비밀번호" name="password" placeholder="비밀번호" type="password"/>
                <AuthButton onClick={handleLogin}>로그인</AuthButton>
                <RightAlignedLink to="/auth/register">회원가입</RightAlignedLink>
            </AuthContent>
        );
}

export default Login;