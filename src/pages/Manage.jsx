// 테이블 페이지
import React, { Component } from 'react';
import ChangeWrapper from '../components/Private/ChangeWrapper';
import MyPage from '../containers/Private/MyPage';
import { Route } from 'react-router-dom';
import MyWord from '../containers/Private/MyWord';
import MyDomain from '../containers/Private/MyDomain';
import MyTerm from '../containers/Private/MyTerm';

class Manage extends Component {

    render() {
        return (
            <ChangeWrapper>
                <Route exact path="/mypage" component={MyPage}/>
                <Route  path="/mypage/word" component={MyWord}/>
                <Route  path="/mypage/term" component={MyTerm}/>
                <Route  path="/mypage/domain" component={MyDomain}/>
            </ChangeWrapper>
        )
    }
}

export default Manage;