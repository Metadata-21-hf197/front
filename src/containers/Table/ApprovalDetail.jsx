// 결재 상세 페이지
import React, { Component } from 'react';
import styled from 'styled-components';
import { ApprovalWithLabel, ApprovalInputLabel } from '../../components/Table';
import ApprovalButton from '../../components/Table/ApprovalButton';
import ApprovalContent from '../../components/Table/ApprovalContent';

class ApprovalDetail extends Component {

    confirmClick = () => {
        //결재 승인 버튼
    }
    denyClick = () => {
        //결재 거절 버튼
    }

    render (){
        const { location } = this.props;
        console.log(location);
        return (
            <Box1>
                    <ApprovalContent title="기존">
                        <ApprovalWithLabel label="id" val={location.props.id}></ApprovalWithLabel>
                        <ApprovalWithLabel label="short" val={location.props.s}></ApprovalWithLabel>
                        <ApprovalWithLabel label="eng" val={location.props.e}></ApprovalWithLabel>
                        <ApprovalWithLabel label="kor" val={location.props.k}></ApprovalWithLabel>
                        <ApprovalWithLabel label="meaning" val={location.props.m}></ApprovalWithLabel>
                    </ApprovalContent>
                    <ApprovalContent title="수정">
                        <ApprovalInputLabel label="short" value={location.props.s} type="text"/>
                        <ApprovalInputLabel label="eng" value={location.props.e} type="text"/>
                        <ApprovalInputLabel label="kor" value={location.props.k} type="text"/>
                        <ApprovalInputLabel label="meaning" value={location.props.m} type="text"/>
                    </ApprovalContent>
                    <ApprovalContent>
                        <ApprovalButton onClick={this.confirmClick}>승인</ApprovalButton>
                        <ApprovalButton onClick={this.denyClick}>삭제</ApprovalButton>
                    </ApprovalContent>
                </Box1>
        )
    }
}

const Box1 = styled.div`
    overflow:auto;
`;

export default ApprovalDetail;