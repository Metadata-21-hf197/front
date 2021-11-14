// 결재 상세 페이지
import React, { Component } from 'react';
import styled from 'styled-components';
import { ApprovalWithLabel, ApprovalInputLabel } from '../../components/Table';
import ApprovalButton from '../../components/Table/ApprovalButton';
import ApprovalContent from '../../components/Table/ApprovalContent';


let u_id;
class WordDetail extends Component {

    state = {
        s_name: "",
        e_name: "",
        k_name: "",
        m_mean: ""
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }
    confirmClick = () => {
        //결재 승인 버튼
        // /word/{wordId} put
        fetch(`/word/${u_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "shortName": this.state.s_name,
              "engName": this.state.e_name,
              "korName": this.state.k_name,
              "meaning": this.state.m_mean
            }),
          })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.log("Error"));
    }

    denyClick = () => {
        //결재 거절 버튼
    }

    render (){
        const { location } = this.props;
        u_id = location.props.id;
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
                        <ApprovalInputLabel label="short" value={location.props.s} onChange={this.handleChange} name="s_name" type="text"/>
                        <ApprovalInputLabel label="eng" value={location.props.e} onChange={this.handleChange} name="e_name" type="text"/>
                        <ApprovalInputLabel label="kor" value={location.props.k} onChange={this.handleChange} name="k_name" type="text"/>
                        <ApprovalInputLabel label="meaning" value={location.props.m} onChange={this.handleChange} name="m_mean" type="text"/>
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

export default WordDetail;