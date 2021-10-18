import React, { Component } from 'react';
import { AuthButton, AuthContent,InputWithLabel, RightAlignedLink } from '../../components/Auth';
import axios from 'axios';
import * as authActions  from '../../redux/modules/auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Login extends Component {

  componentWillUnmount() {
    const { AuthActions } = this.props;
    AuthActions.initializeForm('login')
  }

    handleChange = (e) => {
      const { AuthActions } = this.props;
      const { name, value } = e.target;

      AuthActions.changeInput({
        name,
        value,
        form: 'login'
      });
    }
    render() {
      const {username, password } =this.props.form.toJS();
      const { handleChange } = this;
      return (
        <AuthContent title="로그인">
            <form action="/user/login" method="post">
              <InputWithLabel label="아이디" value={username} onChange={handleChange} name="username" placeholder="아이디"/>
              <InputWithLabel label="비밀번호" value={password} onChange={handleChange} name="password" placeholder="비밀번호" type="password"/>
              <AuthButton>로그인</AuthButton>
            </form>
            <RightAlignedLink to="/user/join">회원가입</RightAlignedLink>
        </AuthContent>
    );
    }
}

export default connect(
  (state) => ({
    form: state.auth.getIn(['login', 'form'])
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(Login);