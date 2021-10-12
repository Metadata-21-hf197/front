import React, { Component } from 'react';
import Header, { MemberIcon, MemberIconm } from '../../components/Base/Header';
import { connect } from 'react-redux';

class MemHeaderContainer extends Component {
    render() {

        return (
            <Header>
                <MemberIcon/>
            </Header>
        );
    }
}

export default MemHeaderContainer