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
      fetch('/domain/'+u_id+"/code", {
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
  

class DomainDetail extends Component {
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
        axios
          .get(`/table/domain/${u_id}`)
          .then(({ data }) => {  
                this.setState({
                korName: data.domain.korName,
                engName: data.domain.engName,
                shortName: data.domain.shortName,
                meaning: data.domain.meaning,
                createUser: data.domain.createUser.memberName,
                createDate: data.domain.createDate.substring(0,10) +" "+ data.domain.createDate.substring(11,13)+":"+ data.domain.createDate.substring(14,16),
                codes: data.domain.codes
                });

                if(data.domain.modifyUser != null){
                    this.setState({
                    modifyUser: data.domain.modifyUser.memberName,
                    modifyDate: data.domain.modifyDate.substring(0,10) +" "+ data.domain.modifyDate.substring(11,13)+":"+ data.domain.modifyDate.substring(14,16)
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

    handleInsertButtonClick = (onClick) => {
        console.log('insert click event');
        onClick();
    }
    
    createCustomInsertButton = (onClick) => {
        return (
          <InsertButton
            btnText='생성신청'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleInsertButtonClick(onClick) }/>
        );
    }
    handleDeleteButtonClick = () => { 
        if(m_id != null){    
        axios
          .delete(`/domain/${u_id}/${m_id}`)
          .then(({ data }) => {
              alert('삭제 신청이 되었습니다');
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
        }else{
            alert('코드를 선택하세요');
        }
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
    createCustomModal = (onModalClose, onClose, columns, validateState, ignoreEditable) => {
        const attr = {
          onModalClose, onClose, columns, validateState, ignoreEditable
        };
        return (
          <CustomInsertModal { ... attr } />
        );
      }

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
        lists = this.state.codes;
        }catch(e){
        }

        return (
            <Box1>
                <div class="col-sm-4">
                    <ApprovalContent title="도메인 정보">
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
                    <h3>코드 목록</h3>
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
    width: 800px;
    overflow: auto;
`;

export default DomainDetail;