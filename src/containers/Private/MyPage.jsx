import axios from 'axios';
import React, { Component } from 'react';
import ManageContent from '../../components/Private/ManageContent';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class MyPage extends Component {
    
    render () {
        return (
            <ManageContent title="수정목록">
                <BootstrapTable>
                    <TableHeaderColumn width='100' dataField='id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn width='50'dataField='shortName'>약자</TableHeaderColumn>
                    <TableHeaderColumn width='200' dataField='engName'>영문명</TableHeaderColumn>
                    <TableHeaderColumn width='200' dataField='korName'>한글명</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='createUser'>작성자</TableHeaderColumn>
                    <TableHeaderColumn width='150' dataField='createDate'>작성일</TableHeaderColumn>
                </BootstrapTable>
            </ManageContent>
        );
    }
}

export default MyPage;