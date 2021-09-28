import React from 'react';
import styled from 'styled-components';
import { shadow } from '../../lib/styleUtil';
import { Link } from 'react-router-dom';

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
        <Link to="/table/word">word</Link>
        <Link to="/table/domain">Domain</Link>
        <Link to="/table/term">Term</Link>
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
    width: 80vw;
    height: 80vh;
    ${shadow(2)}
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: 100%;
    height: auto;
`;

const ButtonPositioner = styled.div`
    position: absolute;
    transform: translate(20%, 50%);
`;
export default TableWrapper;