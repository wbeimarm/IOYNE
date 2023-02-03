import React from 'react';
import AuthRegister from './AuthRegister'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  
const Login = () => (
    <Paper
    sx={{
      p: 8,
      margin: 'auto',
      maxWidth: 500,
      flexGrow: 1,
      marginTop: 12,
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }}
  >
    <Grid container spacing={2}>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
            <AuthRegister />
        </Grid>
      </Grid>
    </Grid>
  </Paper>
);

export default Login;
