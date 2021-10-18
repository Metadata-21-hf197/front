import axios from 'axios';
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


/*async function getDatas() {
    const res = await axios.get(
        '//스트링 워드 링크'
    );
    return res.data;
}*/

function Word () {
    const options = {
        exportCSVText: 'export',
        insertText: 'insert',
        deleteText: 'delete'
    }

    //const [state, refetch] = useData(getDatas, []); 
    //const { loading, data: datas, error } = state;
    
    //if (loading) return alert('로딩중입니다.');
    //if (error) return console.log('에러가 발생했습니다.'); 
    //if (!datas) return null;

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