import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Title = styled.div`
    font-size: 2rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
    width: 50wh;
`;

const ConBox = styled.div`
float:left;
margin:5px;
height:auto;
`;
const ApprovalContent = ({title, children}) => (
    <ConBox>
        <Title>{title}</Title>
        {children}
    </ConBox>
);

export default ApprovalContent;