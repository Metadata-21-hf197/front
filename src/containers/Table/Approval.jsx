import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn, InsertModalFooter, InsertButton} from 'react-bootstrap-table';
import oc from 'open-color';
// 결재 목록 보여주는 페이지 -> 결재 승인하는 상세페이지로 들어감.
class Approval extends Component {

    handleInsertButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for InserButton click event');
        onClick();
      }
    
    createCustomInsertButton = (onClick) => {
        return (
          <InsertButton
            btnText='CustomInsertText'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleInsertButtonClick(onClick) }
            >Insert</InsertButton>
        );
    }
    
    handleSave(save) {
        // Custom your onSave event here,
        // it's not necessary to implement this function if you have no any process before save
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
    
    createCustomModalFooter = (closeModal, save) => {
        return (
          <InsertModalFooter
            className='my-custom-class'
            saveBtnText='CustomSaveText'
            closeBtnText='CustomCloseText'
            closeBtnContextual='btn-warning'
            saveBtnContextual='btn-success'
            closeBtnClass='my-close-btn-class'
            saveBtnClass='my-save-btn-class'
            onSave={ () => this.handleSave(save) }/>
        );
    }

    render (){
        const options = {
            exportCSVText: 'export',
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


export default Approval;