import React, { Component } from 'react';
import Header, { LoginButton } from '../../components/Base/Header';
import { connect } from 'react-redux';
import  * as userActions from '../../redux/modules/users';
import { bindActionCreators } from 'redux';
import storage from '../../lib/storage';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from '../../lib/styleUtil';

class HeaderContainer extends Component {
    handleLogout = async () => {
        const { UserActions } = this.props;
        try {
            await UserActions.logout();
        } catch (e) {
            console.log(e);
        }

        storage.remove('loggedInfo');
        window.location.href = '/'; // 홈페이지로 새로고침
    }
    render() {
        const {visible, user} = this.props;
        if (!visible) return null;

        return (
            <Header>
                { user.get('logged')
                    ? (<div>
                        {user.getIn(['loggedInfo', 'username'])} <BorderedButton onClick={this.handleLogout}>로그아웃</BorderedButton>
                    </div>)
                    : <LoginButton/>
                }
            </Header>
        );
    }
}

const BorderedButton = styled(Link)`
    font-weight: 600;
    color: ${oc.cyan[6]};
    border: 1px solid ${oc.cyan[6]};
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;

    &:hover {
        background: ${oc.cyan[6]};
        color: white;
        ${shadow(1)}
    }

    &:active {
        /* 마우스 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

export default connect(
    (state) => ({
        visible: state.base.getIn(['header', 'visible']),
        user: state.user
    }),
    (dispatch) => ({
        UserActions: bindActionCreators(userActions, dispatch)
    })
)(HeaderContainer);