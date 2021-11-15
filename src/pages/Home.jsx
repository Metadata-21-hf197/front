// 메인 페이지
import React, { Component } from 'react';
import styled from 'styled-components';
import HeaderContainer from '../containers/Base/HeaderContainer';
import { shadow } from '../lib/styleUtil';
import { Link } from 'react-router-dom';
import oc from 'open-color';

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
                           <li>단어 용어 도메인 각 테이블 체크박스 체크 후 컬럼 클릭시 수정 신청</li>
                           <li>각 테이블 페이지 생성 버튼 누르면 신청</li>
                           <li>수정, 삭제 요청 들어온 결재 페이지</li>
                           <li>이인지, 최영우, 한세은</li>
                       </ul>
                   </ShadowedBox>
               </MainContainer>
               <ButtonPositioner>
                <Text>메뉴</Text>
                <BtnLink to="/table/word">word</BtnLink>
                <BtnLink to="/table/domain">Domain</BtnLink>
                <BtnLink to="/table/term">Term</BtnLink>
                <BtnLink to="/table/approval">Approval</BtnLink>
                </ButtonPositioner>
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
const ButtonPositioner = styled.div`
    position: absolute;
    border: 2px solid ${oc.cyan[8]};
    top: 10%;
    transform: translate(30px, 30px);
`;

const BtnLink = styled(Link)`
    color: ${oc.cyan[6]};
    border: 2px solid ${oc.cyan[6]};
    display: block;
    margin: 10px;
    font-size: 20px;
    padding: 5px;
    text-align:center;
    &:hover {
        background: ${oc.cyan[6]};
        color: white;
        ${shadow(1)}
    }
`;

const Text = styled.p`
    color: black;
    display: block;
    margin: 10px;
    font-size: 20px;
    padding: 5px;
    text-align:center;
`;
export default Home;