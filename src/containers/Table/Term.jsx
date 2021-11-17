import axios from 'axios';
import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table';
import oc from 'open-color';
import { shadow } from '../../lib/styleUtil';
import styled from 'styled-components';

let m_id, m_kor, m_eng, m_short, m_mean;
function onRowSelect(row, e) {
    m_id = row.id;
    m_kor = row.korName;
    m_eng = row.engName;
    m_short = row.shortName;
    m_mean = row.meaning;
    console.log(m_id,m_kor,m_eng,m_short,m_mean);
}

class CustomInsertModal extends React.Component {

  handleSaveBtnClick = () => {
    const { columns,  onClose } = this.props;
    const newRow = {};
    columns.forEach((column, i) => {
      newRow[column.field] = this.refs[column.field].value;
    }, this);
    
    console.log(newRow);
    fetch('/term', {
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "shortName":newRow.shortName,
        "engName":newRow.engName,
        "korName":newRow.korName,
        "meaning":newRow.meaning
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
      <div style={ { backgroundColor: '#eeeeee' } } className='modal-content'>
        <h2 style={ { color: 'red' } }>Custom Insert Modal</h2>
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

function nameFilter(createUser, row) {
  return createUser.memberName;
}

function nameFormatter(createUser) {
  return `${createUser.memberName}`;
}

function dateFormatter(date) {
  return date.substring(0,10) +" "+ date.substring(11,13)+":"+ date.substring(14,16);
}

class Term extends Component {

    state = {
        lists: [
            
        ]
    };
    loadData = async () => {
        axios
          .get("/table/term")
          .then(({ data }) => {
            this.setState({ 
              lists: data.termList
            });
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
      };
    componentWillMount() {
        this.loadData();
    }
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
    //삭제 버튼 아이디 날려서 
    handleDeleteButtonClick = () => { 
        axios
          .delete(`/term/${m_id}`)
          .then(({ data }) => {
              console.log(data);
              alert('삭제 신청이 되었습니다');
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
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

    onClickUpdate = () => {
      const { history } =this.props;
      try {
            history.push({
              pathname:'term/update/'+m_id
            });
        } catch (e) {
            console.log("not move");
        }
    }

    onRowClick = (row) => {
      console.log(row.id + 'is click');
      const { history } =this.props;
      try {
            history.push({
              pathname:'term/detail/'+row.id
            });
        } catch (e) {
            console.log("not move");
        }
    }

    render (){
        const options = {
            exportCSVText: 'export',
            insertBtn: this.createCustomInsertButton,
            deleteBtn: this.createCustomDeleteButton,
            sizePerPage: 10,
            sizePerPageList: [ 10, 15, 30 ],
            insertModal:this.createCustomModal,
            onRowClick: this.onRowClick
        };
    
        const selectRowProp = {
            mode:'radio',
            onSelect:onRowSelect
        };
    
        const { lists } = this.state;
        console.log(lists);
        return (
          <>
          <BorderedButton onClick={this.onClickUpdate}>수정</BorderedButton>
          <BootstrapTable data={lists} search={true} multiColumnSearch={true} scrollTop={'Top'}
          options={options} selectRow={ selectRowProp } insertRow deleteRow exportCSV pagination>
              <TableHeaderColumn width='100' dataField='id' isKey hidden>ID</TableHeaderColumn>
              <TableHeaderColumn width='50'dataField='shortName'>약자</TableHeaderColumn>
              <TableHeaderColumn width='200' dataField='engName'>영문명</TableHeaderColumn>
              <TableHeaderColumn width='200' dataField='korName'>한글명</TableHeaderColumn>
              <TableHeaderColumn width='100' dataField='createUser' filterValue={ nameFilter } dataFormat={ nameFormatter }>작성자</TableHeaderColumn>
              <TableHeaderColumn width='150' dataField='createDate' dataFormat={ dateFormatter }>작성일</TableHeaderColumn>
          </BootstrapTable>
          </>
        );
    }
}

const BorderedButton = styled.button`
    font-weight: 600;
    color: ${oc.cyan[6]};
    border: 1px solid ${oc.cyan[6]};
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;
    margin: 10px;
    &:hover {
        background: ${oc.cyan[6]};
        color: white;
        ${shadow(1)}
    }

    &:active {
        /* 마우스 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;
export default Term;