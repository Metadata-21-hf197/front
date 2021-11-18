// 테이블 페이지
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Word, Domain, Term, Approval, WordUpdate, WordDetail, DomainDetail, TermDetail, DomainUpdate, TermUpdate} from '../containers/Table';
import { TableWrapper } from '../components/Table';
import ApprovalDetail from '../containers/Table/ApprovalDetail';

class Table extends Component {

    render() {
        return (
            <TableWrapper>
                <Route exact path="/table/word" component={Word}/>
                <Route path='/table/word/update/:id' exact component={WordUpdate}/>
                <Route path='/table/word/detail/:id' exact component={WordDetail}/>
                <Route exact path="/table/domain" component={Domain}/>
                <Route path='/table/domain/update/:id' exact component={DomainUpdate}/>
                <Route path='/table/domain/detail/:id' exact component={DomainDetail}/>
                <Route exact path="/table/term" component={Term}/>
                <Route path='/table/term/update/:id' exact component={TermUpdate}/>
                <Route path='/table/term/detail/:id' exact component={TermDetail}/>
                <Route exact path="/table/approval" component={Approval}/>
                <Route path="/table/approval/detail/:id" component={ApprovalDetail}/>
            </TableWrapper>
        )
    }
}

export default Table;