import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const ApprovalInputLob = ({label, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input {...rest}/>
    </Wrapper>
);

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }       
`;

const Label = styled.div`
    font-size: 1.8rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const Input = styled.textarea`
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
    ::placeholder {
        color: ${oc.gray[1]};
    }
    resize: none;
    overflow: auto;
`;


export default ApprovalInputLob; 
