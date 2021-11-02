import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { ApprovalWithLabel } from '../../components/Table';
import ApprovalButton from '../../components/Table/ApprovalButton';
import ApprovalContent from '../../components/Table/ApprovalContent';
// 결재 목록 보여주는 페이지 -> 결재 승인하는 상세페이지로 들어감.

class Approval extends Component {

    render() {
        return (
            <div>
                <ApprovalContent title="기존">
                    <ApprovalWithLabel>id</ApprovalWithLabel>
                    <ApprovalWithLabel>shortName</ApprovalWithLabel>
                    <ApprovalWithLabel>engName</ApprovalWithLabel>
                    <ApprovalWithLabel>korName</ApprovalWithLabel>
                </ApprovalContent>
                <ApprovalContent title="수정">

                </ApprovalContent>
                <ApprovalButton>승인</ApprovalButton>
                <ApprovalButton>삭제</ApprovalButton>
            </div>
        )
    }
}

export default Approval;