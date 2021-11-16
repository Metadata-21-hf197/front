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
class Approval extends Component {

    state = {
        lists: {
            
        }
    };
    loadData = async () => {
        axios
          .get("/table/approval")
          .then(({ data }) => {
            this.setState({ 
              lists: data.Approvals
            });
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
                pathname:'approval/detail',
                props:{
                    p_id:m_id
                }
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
            mode:'checkbox',
            onSelect: onRowSelect
        };
    
        const { lists } = this.state;
        console.log(lists);

        return (
            <BootstrapTable data={ lists } search={true} multiColumnSearch={true}
            scrollTop={'Bottom'}
            options={options} selectRow={ selectRowProp } insertRow exportCSV pagination >
                <TableHeaderColumn width='100' dataField='approvalId' isKey>ID</TableHeaderColumn>
                <TableHeaderColumn width='100'dataField='approvalType'>타입</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='approvalStatus'>상태</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='wordType'>타입</TableHeaderColumn>
                <TableHeaderColumn width='100' dataField='createUser' filterValue={ nameFilter } dataFormat={ nameFormatter }>작성자</TableHeaderColumn>
            </BootstrapTable>
    
        );
    }
}

export default Approval;