import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtil';
import { Link } from 'react-router-dom';

const TableWrapper = ({children}) => (
    <Positioner>
        <ShadowedBox>
            <Contents>
                {children}
            </Contents>
        </ShadowedBox>
    </Positioner>
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
    ${shadow(2)}
`;

// children 이 들어가는 곳
const Contents = styled.div`
    background: white;
    padding: 2rem;
    height: auto;
`;

export default TableWrapper;