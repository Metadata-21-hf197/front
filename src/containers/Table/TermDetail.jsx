// 결재 상세 페이지
import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table';
import styled from 'styled-components';
import { ApprovalWithLabel, ApprovalWithLob } from '../../components/Table';
import ApprovalContent from '../../components/Table/ApprovalContent';
import axios from 'axios';

let m_id,u_id;

function onRowSelect(row, e) {
    m_id = row.id;
}
class CustomInsertModal extends React.Component {

    handleSaveBtnClick = () => {
      const { columns,  onClose } = this.props;
      const newRow = {};
      columns.forEach((column, i) => {
        newRow[column.field] = this.refs[column.field].value;
      }, this);
      
      console.log(newRow);
      fetch('/temr/'+u_id+"/code", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "shortName":newRow.shortName,
          "engName":newRow.engName,
          "korName":newRow.korName
        }),
      })
      .then((res) => {
        console.log(res);
        onClose();
      }).catch((e)=>{
        console.log(e);
      })
    }
  
    render() {
      const {
        onModalClose,
        onClose,
        columns,
        validateState,
      } = this.props;
      return (
        <div className='modal-content'>
          <h4>코드 추가</h4>
          <div>
            {
              columns.map((column, i) => {
                const {
                  field,
                  name,
                  hiddenOnInsert
                } = column;
  
                if (hiddenOnInsert) {
                  return null;
                }
                const error = validateState[field] ?
                  (<span className='help-block bg-danger'>{ validateState[field] }</span>) :
                  null;
                return (
                  <div className='form-group' key={ field }>
                    <label>{ name } : </label>
                    <input ref={ field } type='text' defaultValue={ '' } />
                    { error }
                  </div>
                );
              })
            }
          </div>
          <div>
            <button className='btn btn-danger' onClick={ onModalClose }>Leave</button>
            <button className='btn btn-success' onClick={ () => this.handleSaveBtnClick(columns, onClose) }>Confirm</button>
          </div>
        </div>
      );
    }
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
        modifyDate: ""
    };

    loadData = async(props) => {
        u_id = this.props.match.params.id;
        console.log(this.props.match.params.id);
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
            console.log(data);
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
    };

    componentWillMount() {
        this.loadData();
    }

    render (){
        const options = {
            insertBtn: this.createCustomInsertButton, 
            deleteBtn: this.createCustomDeleteButton,
            sizePerPage: 10,
            insertModal:this.createCustomModal
        };

        const selectRowProp = {
            mode:'radio',
            onSelect:onRowSelect
        };
        let lists = {};
        try{
        lists = this.state.words;
        }catch(e){
        }

        return (
            <Box1>
                <div class="col-sm-4">
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
                <div class="col-sm-8">
                    <h3>단어 목록</h3>
                    <BootstrapTable data={lists} scrollTop={'Top'} options={options} selectRow={ selectRowProp } insertRow deleteRow>
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
    overflow:auto;
`;

export default TermDetail;