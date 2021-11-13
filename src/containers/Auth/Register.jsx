import React, { Component} from 'react';
import { AuthContent, InputWithLabel, AuthButton, RightAlignedLink, AuthError } from '../../components/Auth';
import * as authActions  from '../../redux/modules/auth';
import { connect } from 'react-redux';
import {isEmail, isLength, isAlphanumeric, isEmpty} from 'validator';
import {bindActionCreators} from 'redux';
import * as userActions from '../../redux/modules/users';

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
      if(!isAlphanumeric(value) || !isLength(value, { min:4, max:15})) {
        this.setError('아이디는 4~15글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
        return false;
      }
      this.setError(null);
      return true;
    },
    password: (value) => {
      if(!isLength(value, { min: 6 })) {
          this.setError('비밀번호를 6자 이상 입력하세요.');
          return false;
      }
      this.setError(null); 
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
      this.setError(null);
      return true;
    },
    userRole: (value) => {
      if(isEmpty(value)) {
        this.setError('공백 입니다. 직무를 입력해주세요.');
        return false;
      }
      this.setError(null);
      return true;
    }
  }

  handleLocalRegister = async () => {
    const { form, AuthActions, error, history } = this.props;
    const { memberName, password, passwordConfirm, email, userRole } = form.toJS();

    const { validate } = this;
    if(error) return;
    if(!validate['memberName'](memberName)
    || !validate['password'](password)
    || !validate['passwordConfirm'](passwordConfirm)
    || !validate['email'](email)
    || !validate['userRole'](userRole)){
      return;
    }

    try {
      await AuthActions.localRegister({
        memberName, password, email, userRole
      });
      const loggedInfo = this.props.result.toJS();

      //storage.set('loggedInfo',loggedInfo);
      //userActions.setLoggedInfo(loggedInfo);
      //userActions.setValidated(true);
      console.log(loggedInfo);
      history.push('/user/login');
    } catch(e) {
      console.log(e);
      this.setError('알 수 없는 에러가 발생했습니다.')
    }
  }

  render() {
    const { error } = this.props;
    const { memberName, password, passwordConfirm, email, userRole } = this.props.form.toJS();
    const { handleChange, handleLocalRegister } = this;
    return (
      <AuthContent title="회원가입">
        <form action="/user/join" method="post">
          <InputWithLabel label="아이디" value={memberName} onChange={handleChange} name="memberName" placeholder="아이디"/>
          <InputWithLabel label="비밀번호" value={password} onChange={handleChange} name="password" placeholder="비밀번호" type="password"/>
          <InputWithLabel label="비밀번호 확인" value={passwordConfirm} onChange={handleChange} name="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
          <InputWithLabel label="이메일" value={email} onChange={handleChange} name="email" placeholder="이메일"/>
          <InputWithLabel label="직무" value={userRole} onChange={handleChange} name="userRole" placeholder="USER OR ADMIN"/>
          {
            error && <AuthError>{error}</AuthError>
          }
        </form>
          <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
          <RightAlignedLink to="/user/login">로그인</RightAlignedLink>
      </AuthContent>
  );
  } 
}

export default connect(
  (state) => ({
      form: state.auth.getIn(['register', 'form']),
      error: state.auth.getIn(['register', 'error']),
      result: state.auth.get('result')
  }),
  (dispatch) => ({
      AuthActions: bindActionCreators(authActions, dispatch),
      UserActions: bindActionCreators(userActions, dispatch)
  })
)(Register);