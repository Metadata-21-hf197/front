// 결재 상세 페이지
import React, { Component } from 'react';
import styled from 'styled-components';
import { ApprovalWithLabel, ApprovalInputLabel } from '../../components/Table';
import ApprovalButton from '../../components/Table/ApprovalButton';
import ApprovalContent from '../../components/Table/ApprovalContent';


let u_id;
class TermDetail extends Component {

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
            .catch((e) => console.log(e));
    }

    render (){
        const { location } = this.props;
        u_id = location.props.id;
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
                        <ApprovalInputLabel label="short" value={this.state.s_name} onChange={this.handleChange} name="s_name" type="text"/>
                        <ApprovalInputLabel label="eng" value={this.state.e_name} onChange={this.handleChange} name="e_name" type="text"/>
                        <ApprovalInputLabel label="kor" value={this.state.k_name} onChange={this.handleChange} name="k_name" type="text"/>
                        <ApprovalInputLabel label="meaning" value={this.state.m_mean} onChange={this.handleChange} name="m_mean" type="text"/>
                    </ApprovalContent>
                    <ApprovalContent>
                        <ApprovalButton onClick={this.confirmClick}>수정신청</ApprovalButton>
                    </ApprovalContent>
                </Box1>
        )
    }
}

const Box1 = styled.div`
    overflow:auto;
`;

export default TermDetail;