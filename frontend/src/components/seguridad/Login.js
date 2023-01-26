import React from 'react';
import AuthRegister from './AuthRegister'
import { Grid } from '@mui/material';

const Login = () => (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <AuthRegister />
        </Grid>
    </Grid>
);

export default Login;