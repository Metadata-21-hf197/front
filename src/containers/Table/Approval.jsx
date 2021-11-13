import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertButton, DeleteButton} from 'react-bootstrap-table';
import oc from 'open-color';
// 결재 목록 보여주는 페이지 -> 결재 승인하는 상세페이지로 들어감.
class Approval extends Component {

    handleUpdateButtonClick = (onClick) => {
        console.log('update click event');
        onClick();
    }
    
    createCustomUpdateButton = (onClick) => {
        return (
          <InsertButton
            btnText='CustomInsertText'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleUpdateButtonClick(onClick) }
            >Update</InsertButton>
        );
    }
    
    getFieldValue() {
        const newRow = {};
        this.props.columns.forEach((column, i) => {
          newRow[column.field] = this.refs[column.field].value;
        }, this);
        return newRow;
    }

    handleSave(save) {
        console.log('save clcik');
        fetch("http://localhost:3000/approval/insert", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
        }
        )
        save();
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

    handleDeleteButtonClick = (onClick) => {
        console.log('Delete click event');
        onClick();
    }
    
    createCustomDeleteButton = (onClick) => {
        return (
          <DeleteButton
            btnText='CustomDeleteText'
            btnContextual='btn-success'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ e => this.handleDeleteButtonClick(onClick) }>delete</DeleteButton>
        );
    }

    render (){
        const options = {
            exportCSVText: 'export',
            insertBtn: this.createCustomUpdateButton,
            insertModalFooter: this.createCustomModalFooter,
            deleteBtn: this.createCustomDeleteButton
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
            options={options} selectRow={ selectRowProp } insertRow deleteRow  exportCSV >
                <TableHeaderColumn width='100' dataField='id' isKey>ID</TableHeaderColumn>
                <TableHeaderColumn width='100'dataField='shortname'>약자</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='engname'>영문명</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='korname'>한글명</TableHeaderColumn>
                <TableHeaderColumn width='300' dataField='meaning'>설명</TableHeaderColumn>
            </BootstrapTable>
    
        );
    }
}


export default Approval;