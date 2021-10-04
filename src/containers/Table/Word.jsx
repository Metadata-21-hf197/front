import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

function Word () {

    const options = {
        exportCSVText: 'export',
        insertText: 'insert',
        deleteText: 'delete'
    }

    const products = [{
        id: 1,
        shortname: "APT",
        engname: "Advanced Persistent Threat",
        korname: "지능형 타깃 지속 공격",
        index: "1541",
        exp: "ㄱㄴㄷㄻㅊ"
    }, {
        id: 2,
        shortname: "APT",
        engname: "Advanced Persistent Threat",
        korname: "지능형 타깃 지속 공격",
        index: "1541",
        exp: "ㄱㄴㄷㄻㅊ"
    }, {
        id: 3,
        shortname: "APT",
        engname: "Advanced Persistent Threat",
        korname: "지능형 타깃 지속 공격",
        index: "1541",
        exp: "ㄱㄴㄷㄻㅊ"
    }, {
        id: 4,
        shortname: "APT",
        engname: "Advanced Persistent Threat",
        korname: "지능형 타깃 지속 공격",
        index: "1541",
        exp: "ㄱㄴㄷㄻㅊ"
    }];

    return (
        
        <BootstrapTable data={ products } search={true} multiColumnSearch={true}
         
        options={options} insertRow deleteRow exportCSV >
            <TableHeaderColumn width='100' dataField='id' isKey>ID</TableHeaderColumn>
            <TableHeaderColumn width='100'dataField='shortname'>약자</TableHeaderColumn>
            <TableHeaderColumn width='200' dataField='engname'>영문명</TableHeaderColumn>
            <TableHeaderColumn width='200' dataField='korname'>한글명</TableHeaderColumn>
            <TableHeaderColumn width='100' dataField='index'>구분자</TableHeaderColumn>
            <TableHeaderColumn width='300' dataField='exp'>설명</TableHeaderColumn>
        </BootstrapTable>

    );
}

export default Word;