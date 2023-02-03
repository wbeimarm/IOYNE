import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

const Alerts = (props) => {

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
        {
            props.type ?    <Alert severity="info">
            <AlertTitle>{props.nombre}</AlertTitle>
            <strong>{props.descripcion}</strong>
          </Alert>:  <Alert severity="success">
        <AlertTitle>{props.nombre}</AlertTitle>
         <strong>{props.descripcion}</strong>
      </Alert>
        }
    </Stack>
  );
}

export default Alerts