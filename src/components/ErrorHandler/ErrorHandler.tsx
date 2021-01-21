import * as React from 'react';
import styled from "styled-components";
export interface ErrorHandlerProps {
    msg?: string;
}

const StyledErrorMsg = styled.p`
  color: red;
`


const ErrorHandler = (props: ErrorHandlerProps) =>{
    return (
        props.msg ? (
            <StyledErrorMsg>
                {props.msg}
            </StyledErrorMsg>
        ) : (
                <></>
            )
        );
};

export default ErrorHandler;