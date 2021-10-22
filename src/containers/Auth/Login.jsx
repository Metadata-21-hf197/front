import React, { Component } from 'react';
import { AuthButton, AuthContent,InputWithLabel, RightAlignedLink, AuthError } from '../../components/Auth';
import axios from 'axios';
import * as authActions  from '../../redux/modules/auth';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import storage from '../../lib/storage';
import * as userActions from '../../redux/modules/users';

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

    setError = (message) => {
      const { AuthActions } = this.props;
      AuthActions.setError({
        form:'login',
        message
      });
      return false;
    }

    handleLocalLogin = async () => {
      const { form, AuthActions, UserActions, history } = this.props;
      const { username, password } = form.toJS();

      try {
          await AuthActions.localLogin({username, password});
          const loggedInfo = this.props.result.toJS();

          UserActions.setLoggedInfo(loggedInfo);
          history.push('/table/word');
          storage.set('loggedInfo', loggedInfo);

      } catch (e) {
          this.setError('잘못된 계정정보입니다.');
      }
  }
    
    render() {
      const {username, password } =this.props.form.toJS();
      const { handleChange,handleLocalLogin } = this;
      const { error } = this.props;
      return (
        <AuthContent title="로그인">
            <form action="/user/login" method="post">
              <InputWithLabel label="아이디" value={username} onChange={handleChange} name="username" placeholder="아이디"/>
              <InputWithLabel label="비밀번호" value={password} onChange={handleChange} name="password" placeholder="비밀번호" type="password"/>
              {
                    error && <AuthError>{error}</AuthError>
              }
              <AuthButton onClick={handleLocalLogin}>로그인</AuthButton>
            </form>
            <RightAlignedLink to="/user/join">회원가입</RightAlignedLink>
        </AuthContent>
    );
    }
}

export default connect(
  (state) => ({
    form: state.auth.getIn(['login', 'form']),
    error: state.auth.getIn(['login', 'error']),
    result: state.auth.get('result')
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(Login);