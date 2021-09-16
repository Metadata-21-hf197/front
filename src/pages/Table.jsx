// 테이블 페이지
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from '../redux/modules/base';
import { Route } from 'react-router-dom';
import { Word, Domain, Term} from '../containers/Table';
import { TableWrapper } from '../components/Table';

class Table extends Component {

    render() {
        return (
            <TableWrapper>
                <Route path="/table/word" component={Word}/>
                <Route path="/table/domain" component={Domain}/>
                <Route path="/table/term" component={Term}/>
            </TableWrapper>
        )
    }
}

export default Table;