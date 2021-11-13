// 결재 상세 페이지
import React from 'react';
import styled from 'styled-components';
import { ApprovalWithLabel } from '../../components/Table';
import ApprovalButton from '../../components/Table/ApprovalButton';
import ApprovalContent from '../../components/Table/ApprovalContent';

function ApprovalDetail () {

    const confirmClick = () => {
        //결재 승인 버튼
    }
    const denyClick = () => {
        //결재 거절 버튼
    }
    return (
        <Box1>
                <ApprovalContent title="기존">
                    <ApprovalWithLabel label="id">id</ApprovalWithLabel>
                    <ApprovalWithLabel label="short">shortName</ApprovalWithLabel>
                    <ApprovalWithLabel label="eng">engName</ApprovalWithLabel>
                    <ApprovalWithLabel label="kor">korName</ApprovalWithLabel>
                </ApprovalContent>
                <ApprovalContent title="수정">
                    <ApprovalWithLabel label="id">id</ApprovalWithLabel>
                    <ApprovalWithLabel label="short">shortName</ApprovalWithLabel>
                    <ApprovalWithLabel label="eng">engName</ApprovalWithLabel>
                    <ApprovalWithLabel label="kor">korName</ApprovalWithLabel>
                </ApprovalContent>
                <ApprovalContent>
                    <ApprovalButton onClick={confirmClick}>승인</ApprovalButton>
                    <ApprovalButton onClick={denyClick}>삭제</ApprovalButton>
                </ApprovalContent>
            </Box1>
    )
}
const Box1 = styled.div`
    overflow:auto;
`;
export default ApprovalDetail;