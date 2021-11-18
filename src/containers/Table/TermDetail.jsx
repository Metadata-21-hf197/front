// 결재 상세 페이지
import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table';
import styled from 'styled-components';
import { ApprovalWithLabel, ApprovalWithLob } from '../../components/Table';
import ApprovalContent from '../../components/Table/ApprovalContent';
import axios from 'axios';

let m_id=null,u_id, w_id=null;

function onRowSelect(row, e) {
    m_id = row.id;
}

function onRowSelectW(row, e) {
  w_id = row.id;
}
  
class TermDetail extends Component {
    state = {
        korName: "",
        engName: "",
        shortName: "",
        meaning: "",
        createUser: "",
        createDate: "",
        modifyUser: "",
        modifyDate: "",
    };

    loadData = async(props) => {
        u_id = this.props.match.params.id;
        axios
          .get(`/table/term/${u_id}`)
          .then(({ data }) => {  
                this.setState({
                korName: data.term.korName,
                engName: data.term.engName,
                shortName: data.term.shortName,
                meaning: data.term.meaning,
                createUser: data.term.createUser.memberName,
                createDate: data.term.createDate.substring(0,10) +" "+ data.term.createDate.substring(11,13)+":"+ data.term.createDate.substring(14,16),
                checkwords: data.term.words,
                twords: data.twords,
                words: data.words
                });
                
                if(data.term.modifyUser != null){
                    this.setState({
                    modifyUser: data.term.modifyUser.memberName,
                    modifyDate: data.term.modifyDate.substring(0,10) +" "+ data.term.modifyDate.substring(11,13)+":"+ data.term.modifyDate.substring(14,16)
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
    
    handleDeleteButtonClick = () => {
      axios
        .delete(`/term/${u_id}/${m_id}`)
        .then(({ data }) => {
            alert('삭제 신청이 되었습니다');
        })
        .catch(e => {  // API 호출이 실패한 경우
          console.error(e);  // 에러표시
        });
  }

  handleInsertButtonClick = () => {
    try{
      if(this.state.checkwords.includes(w_id)){
        alert("이미 있는 단어입니다");
        return;
      }
    }catch(e){}; 
    axios
        .post(`/term/${u_id}/${w_id}`)
        .then(({ data }) => {
            alert('단어 추가 신청이 되었습니다');
        })
        .catch(e => {  // API 호출이 실패한 경우
          console.error(e);  // 에러표시
        });
}

createCustomInsertButton = () => {
    return (
      <InsertButton
        btnText='생성신청'
        btnContextual='btn-warning'
        className='my-custom-class'
        btnGlyphicon='glyphicon-edit'
        onClick={ this.handleInsertButtonClick }/>
    );
}

  createCustomDeleteButton = () => {
      return (
        <DeleteButton
          btnText='삭제신청'
          btnContextual='btn-warning'
          className='my-custom-class'
          btnGlyphicon='glyphicon-edit'
          onClick={this.handleDeleteButtonClick}
          />
      );
  }

    render (){
        const options = {
            deleteBtn: this.createCustomDeleteButton
        };
        const optionsW = {
          insertBtn: this.createCustomInsertButton, 
            insertBtn: this.createCustomInsertButton, 
          insertBtn: this.createCustomInsertButton, 
          sizePerPage: 5,
          sizePerPageList: [ 5, 10 ],
      };

        const selectRowProp = {
            mode:'radio',
            onSelect: onRowSelect
        };

        const selectRowPropW = {
          mode:'radio',
          onSelect: onRowSelectW
      };

        let lists = {};
        let listsW = {};
        try{
        lists = this.state.twords;
        
        listsW = this.state.words;
        }catch(e){
        }

        return (
            <Box1>
                <div class="col-sm-2">
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
                </div>
                <div class="col-sm-5">
                    <h3>단어 목록</h3>
                    <BootstrapTable data={lists} scrollTop={'Top'} options={options} selectRow={ selectRowProp } deleteRow>
                        <TableHeaderColumn width='100' dataField='id' isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn width='50'dataField='shortName'>약자</TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField='engName'>영문명</TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField='korName'>한글명</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <div class="col-sm-5">
                    <h3>단어 추가</h3>
                    <BootstrapTable data={listsW} scrollTop={'Top'} options={optionsW} search={true} multiColumnSearch={true} selectRow={ selectRowPropW } insertRow pagination>
                        <TableHeaderColumn width='100' dataField='id' isKey hidden>ID</TableHeaderColumn>
                        <TableHeaderColumn width='50'dataField='shortName'>약자</TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField='engName'>영문명</TableHeaderColumn>
                        <TableHeaderColumn width='200' dataField='korName'>한글명</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                </Box1>
        )
    }
}

const Box1 = styled.div`
    width: 1400px;
    overflow:auto;
`;

export default TermDetail;