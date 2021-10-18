import React, { Component, useState } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink } from '../../components/Auth';
import Axios from 'axios';
import axios from 'axios';
import * as authActions  from '../../redux/modules/auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Register extends Component {

  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm('register')
  }

  handleChange = (e) => {
    const { AuthActions } = this.props;
    const { name,  value } = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: 'register'
    });
  }


  render() {
    const { membername, password, passwordConfirm, email } = this.props.form.toJS();
    const { handleChange } = this;
    return (
      <AuthContent title="회원가입">
        <form action="/user/join" method="post">
          <InputWithLabel label="아이디" value={membername} onChange={handleChange} name="memberName" placeholder="아이디"/>
          <InputWithLabel label="비밀번호" value={password} onChange={handleChange} name="password" placeholder="비밀번호" type="password"/>
          <InputWithLabel label="비밀번호 확인" value={passwordConfirm} onChange={handleChange} name="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
          <InputWithLabel label="이메일" value={email} onChange={handleChange} name="email" placeholder="이메일"/>
          <InputWithLabel label="직무"  name="role" placeholder="직무"/>
        </form>
          <AuthButton>회원가입</AuthButton>
          <RightAlignedLink to="/user/login">로그인</RightAlignedLink>
      </AuthContent>
  );
  } 
}

export default connect(
  (state) => ({
      form: state.auth.getIn(['register', 'form'])
  }),
  (dispatch) => ({
      AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Register);