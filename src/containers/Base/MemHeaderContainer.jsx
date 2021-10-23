import React, { Component } from 'react';
import Header, { MemberIcon} from '../../components/Base/Header';

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