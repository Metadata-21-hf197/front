import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// 결재 목록 보여주는 페이지 -> 결재 승인하는 상세페이지로 들어감.
function Approval () {

    const products = [{
        id: 1,
        name: "Product1",
        price: 120
    }, {
        id: 2,
        name: "Product2",
        price: 80
    }];

    return (
        <BootstrapTable data={ products } height='120' scrollTop={ 'Bottom' }>
            <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
    );
}

export default Approval;