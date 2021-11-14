import axios from 'axios';
import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table';

let m_id, m_kor, m_eng, m_short, m_mean;
function onRowSelect(row, e) {
    m_id = row.approvalId;
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
    fetch('/word', {
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
      ignoreEditable
    } = this.props;
    return (
      <div style={ { backgroundColor: '#eeeeee' } } className='modal-content'>
        <h2 style={ { color: 'red' } }>Custom Insert Modal</h2>
        <div>
          {
            columns.map((column, i) => {
              const {
                editable,
                format,
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

class Word extends Component {

    state = {
        lists: [
            
        ]
    };
    loadData = async () => {
        axios
          .get("/table/word")
          .then(({ data }) => {
            this.setState({ 
              lists: data.words
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
          .delete(`/word/${m_id}`)
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

    onRowClick = (row) => {
      console.log(row + 'is click');
      const { history } =this.props;
      try {
            history.push({
                pathname:'word/detail',
                props:{
                    id:row.id,
                    k:row.korName,
                    e:row.engName,
                    s:row.shortName,
                    m:row.meaning
                }
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
            sizePerPage: 5,
            sizePerPageList: [ 5, 15, 30 ],
            insertModal:this.createCustomModal,
            onRowClick:this.onRowClick
        };
    
        const selectRowProp = {
            mode:'radio',
            onSelect:onRowSelect
        };
    
        const { lists } = this.state;
        console.log(lists);
        return (
            <BootstrapTable data={lists} search={true} multiColumnSearch={true} scrollTop={'Top'}
            options={options} selectRow={ selectRowProp } insertRow deleteRow exportCSV pagination>
                <TableHeaderColumn width='100' dataField='id' isKey>ID</TableHeaderColumn>
                <TableHeaderColumn width='100'dataField='shortName'>약자</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='engName'>영문명</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='korName'>한글명</TableHeaderColumn>
                <TableHeaderColumn width='300' dataField='meaning'>설명</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}


export default Word;