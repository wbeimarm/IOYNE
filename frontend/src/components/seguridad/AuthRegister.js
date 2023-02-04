import React, { useState } from 'react';
import { TextField } from '@mui/material';
import {
    Button,
    Typography
} from '@mui/material';
import { useAuth } from "./auth";
import { useDispatch } from 'react-redux';
import { setToken, setPerfil, setRutas, setProducts, setUsuarios, setCotizaciones } from '../../slices/uiSlice';
import { useNavigate } from 'react-router-dom';
import Alerts from '../utils/Alerts';

const AuthRegister = () => {
    const [alertmensaje, setAlertmensaje] = useState(false);
    const [alertvaloresmensaje, setAlertvaloresmensaje] = useState({
        type:0,
        nombre:'',
        descripcion: ''
    });    
    const navigate = useNavigate();
    const { buscardataService } = useAuth();
    const dispatch = useDispatch();
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");

    const onTextChangeCorreo = (e) => setCorreo(e.target.value);
    const onTextChangeClave = (e) => setClave(e.target.value);
    const onReset = () => {
        setCorreo("");
        setClave("");
    }

    const onSubmit = async () => { 
        try {
            // Generar el token
            let parametersLogin = {
                    "name": "loginUsuario",
                    "parameters": {
                      "correo": correo,
                      "clave": clave
                    }
                  }

            const perfil = await buscardataService(
                'procedure',
                parametersLogin
            )
            if(perfil.data[0] !== undefined && perfil.data[0][0] !== undefined && perfil.data[0][0].mensaje !== undefined){
                alerta(1,'Alertta', perfil.data[0][0].mensaje)
                return
            }
            dispatch(setToken(perfil.data[0].token))
            dispatch(setPerfil(perfil.data[0]))
            dispatch(setRutas(perfil.data[1]))
            sessionStorage.setItem("token",perfil.data[0].token);
            sessionStorage.setItem("perfil",perfil.data[0]);
           let parameters = {
            "name": "buscarProductoClienteCotizacion",
            "parameters": {
              "correo": correo
                }
            }
          
            const data = await buscardataService(
                'procedure',
                 parameters
            )
            dispatch(setUsuarios(data.data[0]))
            dispatch(setProducts(data.data[1]))
            dispatch(setCotizaciones(data.data[2]))
            sessionStorage.setItem("usuarios", JSON.stringify(data.data[0]));
            let products = JSON.stringify(data.data[1]);
            sessionStorage.setItem("products",products);
            sessionStorage.setItem("cotizaciones", JSON.stringify(data.data[2]));
            // redireccionar al inicio ya logueado
            navigate('/', {
                produts: data.data[1],
              });
        } catch (error) {
            dispatch(setToken(null));
            dispatch(setPerfil(null));
            dispatch(setRutas(null));
            dispatch(setUsuarios([]));
            dispatch(setProducts([]));
            dispatch(setCotizaciones([]));
            sessionStorage.setItem("usuarios", "");
            sessionStorage.setItem("products", "");
            sessionStorage.setItem("cotizaciones", "");
            sessionStorage.setItem("token", "");    
            sessionStorage.setItem("perfil", "");                
        }
    }

    const alerta = (type, nombre, descripcion) => {
        setAlertvaloresmensaje({
            type,
            nombre,
            descripcion
        })
        setAlertmensaje(true)
        setTimeout(() => {
            setAlertmensaje(false)
        }, 3000);
    }    

    return (
         <>
         <form>
                    <div  style={{ fontSize: "23px", textAlign: "center", marginBottom: "32px", marginTop: "22px"}}>
                                    INICIAR SESIÓN
                    </div>
                    { alertmensaje ? <Alerts type={alertvaloresmensaje.type} name={alertvaloresmensaje.nombre} descripcion={alertvaloresmensaje.descripcion} /> : null}
                    <label>
                        <Typography variant="h6" component="h6">correo</Typography>
                        <TextField
                        onChange={onTextChangeCorreo}
                        value={correo}
                        label={"Correo"}
                        />                        
                    </label>
                    <label>
                        <Typography variant="h6" component="h6">clave</Typography>
                        <TextField
                        onChange={onTextChangeClave}
                        value={clave}
                        label={"Clave"}
                        type="password"
                        />                        
                    </label>
                    <div style={{ padding: '12px'}}>
                        <Button onClick={() =>
                                        onSubmit()
                                    } variant="contained">Entrar..</Button>
                        <Button style={{ marginLeft: "15px"}} onClick={() =>
                                        onReset()
                                    } variant="contained">LImpiar</Button>                                    
                    </div>
                </form>
         </>
    );
};

export default AuthRegister;