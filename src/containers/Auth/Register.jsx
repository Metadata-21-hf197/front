import React, { Component, useState } from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from '../../components/Auth';
import Axios from 'axios';
import axios from 'axios';
import * as authActions  from '../../redux/modules/auth';
import { connect } from 'react-redux';
import {isEmail, isLength, isAlphanumeric, isEmpty} from 'validator';
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

    // 검증작업 진행
    const validation = this.validate[name](value);
    if(name.indexOf('password') > -1 || !validation) return;
  }

  setError = (message) => {
    const {AuthActions} = this.props;
    AuthActions.setError({
      form:'register',
      message
    });
  }

  validate = {
    memberName: (value) => {
      if(!isAlphanumeric(value) || isLength(value, { min:4, max:15})) {
        this.setError('아이디는 4~15글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
        return false;
      }
      return true;
    },
    password: (value) => {
      if(!isLength(value, { min: 6 })) {
          this.setError('비밀번호를 6자 이상 입력하세요.');
          return false;
      }
      this.setError(null); // 이메일과 아이디는 에러 null 처리를 중복확인 부분에서 하게 됩니다
      return true;
    },
    passwordConfirm: (value) => {
        if(this.props.form.get('password') !== value) {
            this.setError('비밀번호확인이 일치하지 않습니다.');
            return false;
        }
        this.setError(null); 
        return true;
    },
    email: (value) => {
      if(!isEmail(value)) {
          this.setError('잘못된 이메일 형식 입니다.');
          return false;
      }
      return true;
    },
    userRole: (value) => {
      if(!isEmpty(value)) {
        this.setError('공백 입니다. 직무를 입력해주세요.');
        return false;
      }
      return true;
    }
  }


  render() {
    const { error } = this.props;
    const { memberName, password, passwordConfirm, email, userRole } = this.props.form.toJS();
    const { handleChange } = this;
    return (
      <AuthContent title="회원가입">
        <form action="/user/join" method="post">
          <InputWithLabel label="아이디" value={memberName} onChange={handleChange} name="memberName" placeholder="아이디"/>
          <InputWithLabel label="비밀번호" value={password} onChange={handleChange} name="password" placeholder="비밀번호" type="password"/>
          <InputWithLabel label="비밀번호 확인" value={passwordConfirm} onChange={handleChange} name="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
          <InputWithLabel label="이메일" value={email} onChange={handleChange} name="email" placeholder="이메일"/>
          <InputWithLabel label="직무" value={userRole} onChange={handleChange} name="userRole" placeholder="직무"/>
          {
            error && <AuthError>{error}</AuthError>
          }
        </form>
          <AuthButton>회원가입</AuthButton>
          <RightAlignedLink to="/user/login">로그인</RightAlignedLink>
      </AuthContent>
  );
  } 
}

export default connect(
  (state) => ({
      form: state.auth.getIn(['register', 'form']),
      error: state.auth.getIn(['register', 'error'])
  }),
  (dispatch) => ({
      AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Register);