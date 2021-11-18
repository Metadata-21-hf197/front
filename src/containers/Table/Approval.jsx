import React, { Component } from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, InsertButton} from 'react-bootstrap-table';


// 결재 목록 보여주는 페이지 -> 결재 승인하는 상세페이지로 들어감.
let m_id;
function onRowSelect(row, e) {
    m_id = row.approvalId;
}

function nameFilter(createUser, row) {
    return createUser.memberName;
  }
  
  function nameFormatter(createUser) {
    return `${createUser.memberName}`;
  }
  
  function dateFormatter(date) {
    return date.substring(0,10) +" "+ date.substring(11,13)+":"+ date.substring(14,16);
  }

class Approval extends Component {

    state = {
        lists: [

        ]
    };
    loadData = async () => {
        axios
          .get("/table/approval")
          .then(({ data }) => {
            this.setState({ 
              lists: data.Approvals
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

    handleUpdateButtonClick = () => {
        const { history } = this.props;
        try {
            history.push({
                pathname:'approval/detail/'+m_id,

            });
        } catch (e) {
            console.log("not move");
        }
    }
    
    createCustomUpdateButton = (onClick) => {
        return (
          <InsertButton
            btnText='Detail'
            btnContextual='btn-warning'
            className='my-custom-class'
            btnGlyphicon='glyphicon-edit'
            onClick={ () => this.handleUpdateButtonClick(onClick) }/>
        );
    }

    render (){
        const options = {
            exportCSVText: 'export',
            insertBtn: this.createCustomUpdateButton,
            sizePerPage: 5,
            sizePerPageList: [ 5, 15, 30 ],
        };
    
        const selectRowProp = {
            mode:'radio',
            onSelect: onRowSelect
        };
    
        const { lists } = this.state;
        console.log(lists);
        return (
            <BootstrapTable data={ lists } search={true} multiColumnSearch={true}
            scrollTop={'Bottom'}
            options={options} selectRow={ selectRowProp } insertRow exportCSV pagination >
                <TableHeaderColumn width='100' dataField='approvalId' isKey>결재번호</TableHeaderColumn>
                <TableHeaderColumn width='80'dataField='approvalType'>요청</TableHeaderColumn>
                <TableHeaderColumn width='120' dataField='wordType'>종류</TableHeaderColumn>
                <TableHeaderColumn width='100' dataField='targetId'>주ID</TableHeaderColumn>
                <TableHeaderColumn width='100' dataField='slaveId'>부ID</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='createUser' filterValue={ nameFilter } dataFormat={ nameFormatter }>작성자</TableHeaderColumn>
                <TableHeaderColumn width='150' dataField='createDate' dataFormat={ dateFormatter }>작성일</TableHeaderColumn>
                <TableHeaderColumn width='100' dataField='approvalStatus'>상태</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}

export default Approval;