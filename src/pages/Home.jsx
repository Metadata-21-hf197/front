// 메인 페이지
import React, { Component } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../containers/Base/HeaderContainer';
import { shadow } from '../lib/styleUtil';

class Home extends Component {
    render() {
        return (
            <div>
               <HeaderContainer/>
               <MainContainer>
                   <ShadowedBox>
                       <ul>
                           <li>IT 보안용어 메타데이터 관리시스템</li>
                           <li>유저 권한은 USER, ADMIN</li>
                           <li>단어, 용어, 도메인-코드</li>
                           <li>결재</li>
                           <li>이인지, 최영우, 한세은</li>
                       </ul>
                   </ShadowedBox>
               </MainContainer>
            </div>
        );
    }
}

const MainContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
// 너비, 그림자 설정
const ShadowedBox = styled.div`
    width: 500px;
    ${shadow(2)}
`;

export default Home;