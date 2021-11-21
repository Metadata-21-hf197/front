// 결재 상세 페이지
import React, { Component } from 'react';
import styled from 'styled-components';
import { ApprovalWithLabel, ApprovalWithLob } from '../../components/Table';
import ApprovalButton from '../../components/Table/ApprovalButton';
import ApprovalContent from '../../components/Table/ApprovalContent';
import axios from 'axios';

let m_id;
class ApprovalDetail extends Component {

    state = {};
    current = {};

    loadData = async () => {
        m_id = this.props.match.params.id;
        axios
          .get(`/table/approval/${m_id}`)
          .then(({ data }) => {
            console.log(data);
            try{
            this.current={
              korName: data.basic.korName,
              engName: data.basic.engName,
              shortName: data.basic.shortName,
              meaning: data.basic.meaning,
            };
          }catch(e){
            this.current={
              korName: "새로 생성",
              engName: "새로 생성",
              shortName: "새로 생성",
              meaning: "새로 생성"
          }
        }
          if(data.approval.wordType == "TERMWORD"){
            this.setState({
              approvalType: data.approval.approvalType,
              wordType: data.approval.wordType,
              korName: "단어 id:"+data.approval.slaveId,
              engName: "단어 id:"+data.approval.slaveId,
              shortName: "단어 id:"+data.approval.slaveId,
              meaning: "단어 id:"+data.approval.slaveId
            })
          }else{
            this.setState({ 
              approvalType: data.approval.approvalType,
              wordType: data.approval.wordType,
              korName: data.approval.korName,
              engName: data.approval.engName,
              shortName: data.approval.shortName,
              meaning: data.approval.meaning,
            });
          }
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
        return (
            <Box1>
              <h2>{this.state.wordType}: {this.state.approvalType}</h2>
                    <ApprovalContent title="기존">
                        <ApprovalWithLabel label="한글명" val={this.current.korName} ></ApprovalWithLabel>
                        <ApprovalWithLabel label="영문명" val={this.current.engName}></ApprovalWithLabel>
                        <ApprovalWithLabel label="약자" val={this.current.shortName}></ApprovalWithLabel>
                        <ApprovalWithLob label="뜻" val={this.current.meaning}></ApprovalWithLob>
                    </ApprovalContent>
                    <ApprovalContent title="수정">
                        <ApprovalWithLabel label="한글명" val={this.state.korName === null ? "변경 없음: 기존 값 유지" : this.state.korName} type="text"/>
                        <ApprovalWithLabel label="영문명" val={this.state.engName === null ? "변경 없음: 기존 값 유지" : this.state.engName}  type="text"/>
                        <ApprovalWithLabel label="약자" val={this.state.setState === null ? "변경 없음: 기존 값 유지" : this.state.shortName} type="text"/>
                        <ApprovalWithLob label="뜻" val={this.state.meaning === null ? "변경 없음: 기존 값 유지" : this.state.meaning} type="text"/>
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