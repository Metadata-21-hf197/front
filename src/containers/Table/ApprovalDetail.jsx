// 결재 상세 페이지
import React, { Component } from 'react';
import styled from 'styled-components';
import { ApprovalWithLabel, ApprovalInputLabel } from '../../components/Table';
import ApprovalButton from '../../components/Table/ApprovalButton';
import ApprovalContent from '../../components/Table/ApprovalContent';
import axios from 'axios';

let m_id;
class ApprovalDetail extends Component {

    state = {
        lists: [
            
        ]
    };

    loadData = async () => {
        axios
          .get(`/table/approval/${m_id}`)
          .then(({ data }) => {
            this.setState({ 
              lists: data.approval
            });
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
      };

    confirmClick = () => {
        //결재 승인 버튼
        // /word/{wordId} put
    }
    denyClick = () => {
        //결재 거절 버튼
    }

    render (){
        const { location } = this.props;
        console.log(location);
        m_id = location.props.id;
        const { lists } = this.state;
        console.log(lists);
        return (
            <Box1>
                    <ApprovalContent title="기존">
                        <ApprovalWithLabel label="id" val={location.props.id}></ApprovalWithLabel>
                        <ApprovalWithLabel label="type" val={location.props.type}></ApprovalWithLabel>
                        <ApprovalWithLabel label="status" val={location.props.sta}></ApprovalWithLabel>
                        <ApprovalWithLabel label="wordType" val={location.props.wtype}></ApprovalWithLabel>
                        <ApprovalWithLabel label="User" val={location.props.user}></ApprovalWithLabel>
                    </ApprovalContent>
                    <ApprovalContent title="수정">
                        <ApprovalInputLabel label="type"  type="text"/>
                        <ApprovalInputLabel label="status"  type="text"/>
                        <ApprovalInputLabel label="wordType"  type="text"/>
                        <ApprovalInputLabel label="User"  type="text"/>
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