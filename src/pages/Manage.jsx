// 테이블 페이지
import React, { Component } from 'react';
import { Route } from 'react-router';
import ChangeWrapper from '../components/Private/ChangeWrapper';
import MyPage from '../containers/Private/MyPage';

class Manage extends Component {

    render() {
        return (
            <ChangeWrapper>
                <MyPage/>
            </ChangeWrapper>
        )
    }
}

export default Manage;