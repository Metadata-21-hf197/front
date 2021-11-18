import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from '../../lib/styleUtil';

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
    margin: 10px;
`;
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
    margin: 2px;
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

const ManageContent = ({title, children}) => (
    <div>
        <BorderedButton to="/mypage">결재</BorderedButton>
        <BorderedButton to="/mypage/word">단어</BorderedButton>
        <BorderedButton to="/mypage/term">용어</BorderedButton>
        <BorderedButton to="/mypage/domain">도메인</BorderedButton>
        <Title>{title}</Title>
        {children}
    </div>
);

export default ManageContent;