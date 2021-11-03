import React from 'react';
import styled from 'styled-components';
import { shadow } from '../../lib/styleUtil';
import { Link } from 'react-router-dom';
import oc from 'open-color';

const TableWrapper = ({children}) => (
    <>
    <Positioner>
        <ShadowedBox>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
    <ButtonPositioner>
        <Text>메뉴</Text>
        <BtnLink to="/table/word">word</BtnLink>
        <BtnLink to="/table/domain">Domain</BtnLink>
        <BtnLink to="/table/term">Term</BtnLink>
        <BtnLink to="/table/approval">Approval</BtnLink>
    </ButtonPositioner>
    </>
);

// 화면의 중앙에 위치시킨다
const Positioner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

// 너비, 그림자 설정
const ShadowedBox = styled.div`
    width: auto;
    height: auto;
    ${shadow(2)}
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
    width: auto;
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
export default TableWrapper;