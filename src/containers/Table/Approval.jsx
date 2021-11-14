import React, { Component } from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn, InsertButton} from 'react-bootstrap-table';

// 결재 목록 보여주는 페이지 -> 결재 승인하는 상세페이지로 들어감.
function onRowSelect(row, isSelected, e) {
    let rowStr = '';
    for (const prop in row) {
      rowStr += prop + ': "' + row[prop] + '"';
    }
    console.log(e);
    alert(`is selected: ${isSelected}, ${rowStr}`);
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
            history.push('approval/detail');
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
        };
    
        const selectRowProp = {
            mode:'radio',
            onSelect: onRowSelect
        };
    
        const { lists } = this.state;
        console.log(lists);

        return (
            <BootstrapTable data={ lists } search={true} multiColumnSearch={true}
            options={options} selectRow={ selectRowProp } insertRow exportCSV pagination >
                <TableHeaderColumn width='100' dataField='approvalid' isKey>ID</TableHeaderColumn>
                <TableHeaderColumn width='100'dataField='shortName'>약자</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='engName'>영문명</TableHeaderColumn>
                <TableHeaderColumn width='200' dataField='korName'>한글명</TableHeaderColumn>
                <TableHeaderColumn width='300' dataField='meaning'>설명</TableHeaderColumn>
            </BootstrapTable>
    
        );
    }
}


export default Approval;