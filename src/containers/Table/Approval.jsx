import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// 결재 목록 보여주는 페이지 -> 결재 승인하는 상세페이지로 들어감.
class Approval extends Component {
    
    handleInsertButtonClick = (onClick) => {
        console.log('insert clcik');
        onClick();
    }
    createCustomInsertButton = (onClick) => {
        return (
            <button style={ { color: 'red' } } onClick={ onClick }>Add rows</button>
        );
    }
      
    render (){
        const options = {
            exportCSVText: 'export',
            insertBtn: this.createCustomInsertButton,
            deleteText: 'delete'
        };
    
        const selectRowProp = {
            mode:'radio'
        };
    
        const products = [{
            id: 1,
            shortname: "APT",
            engname: "Advanced Persistent Threat",
            korname: "지능형 타깃 지속 공격",
            index: "1541",
            meaning: "ㄱㄴㄷㄻㅊ"
        }, {
            id: 2,
            shortname: "APT",
            engname: "Advanced Persistent Threat",
            korname: "지능형 타깃 지속 공격",
            index: "1541",
            meaning: "ㄱㄴㄷㄻㅊ"
        }, {
            id: 3,
            shortname: "APT",
            engname: "Advanced Persistent Threat",
            korname: "지능형 타깃 지속 공격",
            index: "1541",
            meaning: "ㄱㄴㄷㄻㅊ"
        }, {
            id: 4,
            shortname: "APT",
            engname: "Advanced Persistent Threat",
            korname: "지능형 타깃 지속 공격",
            index: "1541",
            meaning: "ㄱㄴㄷㄻㅊ"
        }];
        return (
            <BootstrapTable data={ products } search={true} multiColumnSearch={true}
            options={options} selectRow={selectRowProp } insertRow deleteRow exportCSV >
                <TableHeaderColumn width='100' dataField='id' isKey>ID</TableHeaderColumn>
                <TableHeaderColumn width='100'dataField='shortname'>약자</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='engname'>영문명</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='korname'>한글명</TableHeaderColumn>
                <TableHeaderColumn width='100' dataField='index'>구분자</TableHeaderColumn>
                <TableHeaderColumn width='300' dataField='meaning'>설명</TableHeaderColumn>
            </BootstrapTable>
    
        );
    }
}


export default Approval;