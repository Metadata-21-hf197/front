import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table';
import oc from 'open-color';
// 도메인, 생성 수정 삭제
class Domain extends Component {

    handleInsertButtonClick = (onClick) => {
        console.log('insert click event');
        onClick();
    }
    
    createCustomInsertButton = (onClick) => {
        return (
          <InsertButton
            btnText='Insert'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleInsertButtonClick(onClick) }/>
        );
    }

    getFieldValue() {
        const newRow = {};
        this.props.columns.forEach((column, i) => {
          newRow[column.field] = this.refs[column.field].value;
        }, this);
        return newRow;
    }
    
    createCustomModalFooter = (onClose, onSave) => {
        const style = {
          backgroundColor: '#ffffff'
        };
        return (
          <div className='modal-footer' style={ style }>
            <button className='btn btn-xs btn-info' onClick={ onClose }>Leave</button>
            <button className='btn btn-xs btn-danger' onClick={ onSave }>Confirm</button>
          </div>
        );
    }

    render (){
        const options = {
            exportCSVText: 'export',
            updateBtn: this.createCustomUpdateButton,
            insertBtn: this.createCustomInsertButton,
            insertModalFooter: this.createCustomModalFooter
        };
    
        const selectRowProp = {
            mode:'radio'
        };
    
        const products = [{
            id: 1,
            shortname: "APT",
            engname: "Advanced Persistent Threat",
            korname: "지능형 타깃 지속 공격",
            meaning: "ㄱㄴㄷㄻㅊ"
        }, {
            id: 2,
            shortname: "APT",
            engname: "Advanced Persistent Threat",
            korname: "지능형 타깃 지속 공격",
            meaning: "ㄱㄴㄷㄻㅊ"
        }, {
            id: 3,
            shortname: "APT",
            engname: "Advanced Persistent Threat",
            korname: "지능형 타깃 지속 공격",
            meaning: "ㄱㄴㄷㄻㅊ"
        }, {
            id: 4,
            shortname: "APT",
            engname: "Advanced Persistent Threat",
            korname: "지능형 타깃 지속 공격",
            meaning: "ㄱㄴㄷㄻㅊ"
        }];

        return (
            <BootstrapTable data={ products } search={true} multiColumnSearch={true}
            options={options} selectRow={ selectRowProp } insertRow  exportCSV >
                <TableHeaderColumn width='100' dataField='id' isKey>ID</TableHeaderColumn>
                <TableHeaderColumn width='100'dataField='shortname'>약자</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='engname'>영문명</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='korname'>한글명</TableHeaderColumn>
                <TableHeaderColumn width='300' dataField='meaning'>설명</TableHeaderColumn>
            </BootstrapTable>
    
        );
    }
}


export default Domain;