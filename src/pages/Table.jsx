// 테이블 페이지
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as baseActions from '../redux/modules/base';
import { Route } from 'react-router-dom';

class Table extends Component {

    render() {
        return (
            <TableWrapper>
                <Route path="/table/word" />
                <Route path="/table/domain" />
                <Route path="/table/term" />
            </TableWrapper>
        )
    }
}
