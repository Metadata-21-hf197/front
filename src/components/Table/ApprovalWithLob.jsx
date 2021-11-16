import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const ApprovalWithLob = ({label, val}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Value>{val}</Value>
    </Wrapper>
);

// textarea와는 rem/2 배
const Wrapper = styled.div`
    margin-bottom: 0.5rem;
`;

const Label = styled.div`
    font-size: 1.8rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const Value = styled.div`
    width: 20rem;
    border: 2px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.5rem;
    padding: 2px;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    height: 6rem;
`;


export default ApprovalWithLob;