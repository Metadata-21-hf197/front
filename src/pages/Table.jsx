// 테이블 페이지
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Word, Domain, Term, Approval} from '../containers/Table';
import { TableWrapper } from '../components/Table';
import ApprovalDetail from '../containers/Table/ApprovalDetail';



class Table extends Component {

    render() {
        return (
            <TableWrapper>
                <Route path="/table/word" component={Word}/>
                <Route path="/table/domain" component={Domain}/>
                <Route path="/table/term" component={Term}/>
                <Route exact path="/table/approval" component={Approval}/>
                <Route path="/table/approval/detail" component={ApprovalDetail}/>
            </TableWrapper>
        )
    }
}

export default Table;