import axios from 'axios';
import React, { Component } from 'react';
import ManageContent from '../../components/Private/ManageContent';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class MyWord extends Component {
    state = {
        lists: [

        ]
    };
    loadData = async () => {
        axios
          .get("/mypage")
          .then(({ data }) => {
            this.setState({ 
              lists: data
            });
            console.log(data);
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
      };

    componentWillMount() {
        this.loadData();
    }

    render () {
        const { lists } = this.state.lists;
        const options = {
          sizePerPage: 5,
          sizePerPageList: [ 5, 10, 15 ]
      };
        return (
            <ManageContent title="단어목록">
                <BootstrapTable data={lists} pagination options={options}>
                    <TableHeaderColumn width='100' dataField='id' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn width='50'dataField='shortName'>약자</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='engName'>영문명</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='korName'>한글명</TableHeaderColumn>
                </BootstrapTable>
            </ManageContent>
        );
    }
}

export default MyWord;