import React from "react";
import { Container } from '@mui/material';

const Base = ({ children, ...rest }) => {
    return (
        <div {...rest}>
            <div >
                <Container>
                    {children}
                </Container>
            </div>
        </div>
    )
}

export default Base;