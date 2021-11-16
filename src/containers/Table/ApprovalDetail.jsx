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
        lists: {

        },
        b_lists:{
          
        }
    };

    loadData = async () => {
        const { location } = this.props;
        m_id = location.props.p_id;
        console.log(m_id);
        axios
          .get(`/table/approval/${m_id}`)
          .then(({ data }) => {
            this.setState({ 
              lists: data.approval,
              b_lists: data.basic
            });
            console.log(data);
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
      };

    componentWillMount() {
        this.loadData();
    }
    confirmClick = () => {
        const {history} = this.props;
        //결재 승인 버튼
        // /word/{wordId} put
        axios
          .put(`/approval/confirm/${m_id}`)
          .then(({ data }) => {
            console.log(data);
            alert('승인되었습니다.')
            history.goBack();
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
    }
    denyClick = () => {
        const {history} = this.props;
        //결재 거절 버튼
        axios
          .put(`/approval/deny/${m_id}`)
          .then(({ data }) => {
            console.log(data);
            alert('거절되었습니다.')
            history.goBack();
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
    }

    render (){ 
        const { lists, b_lists } = this.state;
        console.log(lists);
        console.log(b_lists);
        return (
            <Box1>
                    <ApprovalContent title="기존">
                        <ApprovalWithLabel label="id" val={b_lists.id}></ApprovalWithLabel>
                        <ApprovalWithLabel label="kor" val={b_lists.korName} ></ApprovalWithLabel>
                        <ApprovalWithLabel label="eng" val={b_lists.engName}></ApprovalWithLabel>
                        <ApprovalWithLabel label="short" val={b_lists.shortName}></ApprovalWithLabel>
                        <ApprovalWithLabel label="meaning" val={b_lists.meaning}></ApprovalWithLabel>
                    </ApprovalContent>
                    <ApprovalContent title="수정">
                        <ApprovalInputLabel label="kor" value={lists.korName} type="text"/>
                        <ApprovalInputLabel label="eng" value={lists.engName}  type="text"/>
                        <ApprovalInputLabel label="short" value={lists.shortName} type="text"/>
                        <ApprovalInputLabel label="meaning" value={lists.meaning} type="text"/>
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