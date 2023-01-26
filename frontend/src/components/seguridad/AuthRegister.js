import React, { useState } from 'react';

import {
    Button,
    Grid,
    Typography
} from '@mui/material';
import { useAuth } from "./auth";

const AuthRegister = () => {
    const { asignarTokenServicios, loginService } = useAuth();

    const onSubmit = async (usuario, clave) => { 
        const perfil = await asignarTokenServicios(
            usuario,
            clave
        );
        console.log('perfil',perfil);
    }


    return (
         <Grid container spacing={3}>
            <Grid item xs={12}>
                <form>
                    <label>
                        <Typography variant="h6" component="h6">correo</Typography>
                        <input type="text" />
                    </label>
                    <label>
                        <Typography variant="h6" component="h6">clave</Typography>
                        <input type="password" />
                    </label>
                    <div style={{ padding: '12px'}}>
                        <Button onClick={() =>
                                        onSubmit('afnarqui9@gmail.com','PATR1.')
                                    } variant="contained">Entrar..</Button>
                    </div>
                </form>
            </Grid>
         </Grid>
    );
};

export default AuthRegister;