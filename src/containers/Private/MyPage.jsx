import axios from 'axios';
import React, { Component } from 'react';
import ManageContent from '../../components/Private/ManageContent';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class MyPage extends Component {
    state = {
        lists: [

        ]
    };
    loadData = async () => {
        axios
          .get("/mypage")
          .then(({ data }) => {
            this.setState({ 
              lists: data.approvalList,
            });
            console.log(this.state);
          })
          .catch(e => {  // API 호출이 실패한 경우
            console.error(e);  // 에러표시
          });
      };

    componentWillMount() {
        this.loadData();
    }

    render () {
        const { lists } = this.state;
        const options = {
          sizePerPage: 5,
          sizePerPageList: [ 5, 10, 15 ]
      };
        return (
            <ManageContent title="결재목록">
                <BootstrapTable data={ lists } pagination options={options}>
                    <TableHeaderColumn width='100' dataField='approvalId' isKey hidden>ID</TableHeaderColumn>
                    <TableHeaderColumn width='100'dataField='approvalType'>타입</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='approvalStatus'>상태</TableHeaderColumn>
                    <TableHeaderColumn width='100' dataField='wordType'>타입</TableHeaderColumn>
                </BootstrapTable>
            </ManageContent>
        );
    }
}

export default MyPage;