// 결재 상세 페이지
import React, { Component } from 'react';
import styled from 'styled-components';
import { ApprovalWithLabel, ApprovalWithLob } from '../../components/Table';
import ApprovalContent from '../../components/Table/ApprovalContent';
import axios from 'axios';

let u_id;

class WordDetail extends Component {
    state = {
        korName: "",
        engName: "",
        shortName: "",
        meaning: "",
        createUser: "",
        createDate: "",
        modifyUser: "",
        modifyDate: ""
    };

    loadData = async(props) => {
        u_id = this.props.match.params.id;
        console.log(u_id);
        axios
          .get(`/table/word/${u_id}`)
          .then(({ data }) => {  
                this.setState({
                korName: data.word.korName,
                engName: data.word.engName,
                shortName: data.word.shortName,
                meaning: data.word.meaning,
                createUser: data.word.createUser.memberName,
                createDate: data.word.createDate.substring(0,10) +" "+ data.word.createDate.substring(11,13)+":"+ data.word.createDate.substring(14,16)
                });

                if(data.word.modifyUser != null){
                    this.setState({
                    modifyUser: data.word.modifyUser.memberName,
                    modifyDate: data.word.modifyDate.substring(0,10) +" "+ data.word.modifyDate.substring(11,13)+":"+ data.word.modifyDate.substring(14,16)
                    });
                } else {
                    this.setState({
                        modifyUser: " ",
                        modifyDate: " "
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

    render (){
        return (
            <Box1>
                    <ApprovalContent title="기존">
                        <ApprovalWithLabel label="한글명" val={this.state.korName}></ApprovalWithLabel>
                        <ApprovalWithLabel label="영문명" val={this.state.engName}></ApprovalWithLabel>
                        <ApprovalWithLabel label="약자" val={this.state.shortName}></ApprovalWithLabel>
                        <ApprovalWithLob label="뜻" val={this.state.meaning}></ApprovalWithLob>
                        <ApprovalWithLabel label="작성일" val={this.state.createDate}></ApprovalWithLabel>
                        <ApprovalWithLabel label="수정일" val={this.state.modifyDate}></ApprovalWithLabel>
                        <ApprovalWithLabel label="작성자" val={this.state.createUser}></ApprovalWithLabel>
                        <ApprovalWithLabel label="수정자" val={this.state.modifyUser}></ApprovalWithLabel>
                    </ApprovalContent>
                </Box1>
        )
    }
}

const Box1 = styled.div`
    overflow:auto;
`;

export default WordDetail;