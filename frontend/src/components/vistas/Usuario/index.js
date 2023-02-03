import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUsuarios } from '../../../slices/uiSlice';
import {
    Button,
    Typography
} from '@mui/material';
import { useAuth } from "../../seguridad/auth";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Alerts from '../../utils/Alerts';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Base from '../../layout/Base/normal';

export default function Usuario() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [id, setId] = useState(0);
    const [update, setUpdate] = useState(false);
    const [nombreGuardar, setNombreGuardar] = useState("Guardar");
    
    const [alertmensaje, setAlertmensaje] = useState(false);
    const [alertvaloresmensaje, setAlertvaloresmensaje] = useState({
        type:0,
        nombre:'',
        descripcion: ''
    });
    const dispatch = useDispatch();
    const { buscardataService } = useAuth();
    const onTextChangeNombre = (e) => setNombre(e.target.value);
    const onTextChangeCorreo = (e) => setCorreo(e.target.value);
    const onReset = () => {
        setNombre("");
        setCorreo("");
        setId(0);
        setUpdate(false);
        setNombreGuardar("Guardar")   
    }
    const [state, setState] = useState({
        columns: [ { field: 'nombre', headerName: 'nombre', width: 150 },
        { field: 'correo', headerName: 'correo', width: 150 }],
        rows: [  { id: 1, nombre: '', correo: '' }],
    });

        useEffect(() => {
            let isSubscribed = true;
          
            const fetchData = async () => {
              let parameters = {
                "name": "cualquiercosa",
                "parameters": {
                    "afn": "select usuarioId as id, nombre, correo from usuario"
                    }
                }
              
            const data = await buscardataService(
                'procedure',
                    parameters
            )
            
            if (isSubscribed) {
                dispatch(setUsuarios(data.data[0]));
                setState({
                    columns: state.columns, 
                    rows: data.data[0]})   
              }
            }
          
            fetchData()
              .catch(console.error);;
            return () => isSubscribed = false;
          }, [])        

    const onSubmitDelete = async () => {
        try {
            let parameters = {
             "name": "eliminarUsuario",
             "parameters": {
                 "id": Number(id)
                 }
             }
           
             const data = await buscardataService(
                 'procedure',
                  parameters
             )
             dispatch(setUsuarios(data.data[0]))
             sessionStorage.setItem("usuarios", JSON.stringify(data.data[0]));
             setState({
                 columns: state.columns, 
                 rows: data.data[0]})   
             onReset()
             alerta(0,'Cliente', 'El cliente fue eliminado con exito..')
         } catch (error) {
             onReset()
             alerta(1,'Cliente', 'Se genero un problema al eliminar el cliente..')
         }        
    }

    const onSubmit = async () => { 
        try {
           let table = update ? "actualizarUsuario" : "guardarUsuario";
           let parameters = {}
           if(update) {
            parameters = { 
                "name": table,
            "parameters": {
                "id": Number(id),
                "nombre": nombre,
                "correo": correo
                }
            }
           } else  {
            parameters = { 
                "name": table,
            "parameters": {
                "nombre": nombre,
                "correo": correo
                }
            }            
           }
           
          
            const data = await buscardataService(
                'procedure',
                 parameters
            )
            dispatch(setUsuarios(data.data[0]))
            sessionStorage.setItem("usuarios", JSON.stringify(data.data[0]));
            setState({
                columns: state.columns, 
                rows: data.data[0]})   
            onReset()
            alerta(0,'Cliente', 'El cliente fue generado con exito..')
        } catch (error) {
            onReset()
            alerta(1,'Cliente', 'Se genero un problema al guardar el cliente..')
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

    const onClickGrid = (e) => {
        setId(e.row.id);
        setNombre(e.row.nombre);
        setCorreo(e.row.correo); 
        setUpdate(true);
        setNombreGuardar("Actualizar")        
    }

    return (
        <Base>
        <Paper
            sx={{
            p: 8,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            marginTop: 2,
            backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
            <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                   { alertmensaje ? <Alerts type={alertvaloresmensaje.type} name={alertvaloresmensaje.nombre} descripcion={alertvaloresmensaje.descripcion} /> : null}
                <form>
                        <div  style={{ fontSize: "23px", textAlign: "center", marginBottom: "32px", marginTop: "22px"}}>
                                        CLIENTE
                        </div>
                        <label>
                            <Typography variant="h6" component="h6">nombre</Typography>
                            <TextField
                            onChange={onTextChangeNombre}
                            value={nombre}
                            label={"Nombre"}
                            />                        
                        </label>
                        <label>
                            <Typography variant="h6" component="h6">correo</Typography>
                            <TextField
                            onChange={onTextChangeCorreo}
                            value={correo}
                            label={"Correo"}
                            />                        
                        </label>
                        <div style={{ padding: '12px'}}>
                            <Button onClick={() =>
                                            onSubmit()
                                        } variant="contained">{nombreGuardar}</Button>
                            <Button style={{ marginLeft: "15px"}} onClick={() =>
                                            onReset()
                                        } variant="contained">LImpiar</Button>   
                           {update ?    <Button style={{ background:'red', marginLeft: "15px"}} onClick={() =>
                                            onSubmitDelete()
                                        } variant="contained">Eliminar</Button>     : null}                                 
                        </div>
                    </form>
                </Grid>
            </Grid>
            </Grid>
        </Paper>

         <Box sx={{ height: 400, width: '100%' }}>

            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                    <DataGrid  onCellClick={(event) => {
                    onClickGrid(event);
                }} rows={state.rows} columns={state.columns}  pagination pageSize={10}
                    sx={{
                    boxShadow: 2,
                    border: 2,
                    borderColor: 'primary.light',
                    '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                    },
                }}
                />
             </div>
            </div>
        </Box>
     </Base>
    )
}
