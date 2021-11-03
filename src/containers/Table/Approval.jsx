import React, { Component } from 'react';
import styled from 'styled-components';
import { ApprovalWithLabel } from '../../components/Table';
import ApprovalButton from '../../components/Table/ApprovalButton';
import ApprovalContent from '../../components/Table/ApprovalContent';
// 결재 목록 보여주는 페이지 -> 결재 승인하는 상세페이지로 들어감.

class Approval extends Component {

    render() {
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
                    <ApprovalButton>승인</ApprovalButton>
                    <ApprovalButton>삭제</ApprovalButton>
                </ApprovalContent>
            </Box1>
        )
    }
}

const Box1 = styled.div`
    overflow:auto;
`;

export default Approval;