import axios from 'axios';
import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table';

function onRowSelect(row, e) {
    let rowStr = row.id;
    console.log(e);
    return rowStr;
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
    handleDeleteButtonClick = (onClick) => {
        const k = onRowSelect
        axios
          .delete(`/word/id=${k}`)
          .then(({ data }) => {
              console.log(data);
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
    }
    
    createCustomDeleteButton = (onClick) => {
        return (
          <DeleteButton
            btnText='삭제신청'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleDeleteButtonClick(onClick) }/>
        );
    }

    // confirm 클릭 메소드
    handleClickConfirm = () => {
        
    }

    createCustomModalFooter = (onClose, onSave) => {
        const style = {
          backgroundColor: '#ffffff'
        };
        return (
          <div className='modal-footer' style={ style }>
            <button className='btn btn-xs btn-info' onClick={ onClose }>Leave</button>
            <button className='btn btn-xs btn-danger' onClick={ this.handleClickConfirm }>Confirm</button>
          </div>
        );
    }

    render (){
        const options = {
            exportCSVText: 'export',
            insertBtn: this.createCustomInsertButton,
            insertModalFooter: this.createCustomModalFooter,
            deleteBtn: this.createCustomDeleteButton
        };
    
        const selectRowProp = {
            mode:'radio',
            onSelect:onRowSelect
        };
    
        const { lists } = this.state;
        console.log(lists);
        return (
            <BootstrapTable data={lists} search={true} multiColumnSearch={true}
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