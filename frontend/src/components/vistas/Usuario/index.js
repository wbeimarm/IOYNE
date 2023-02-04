import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setUsuarios, setPerfilCliente } from '../../../slices/uiSlice';
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
import Autocomplete from '@mui/material/Autocomplete';

export default function Usuario() {
    let perfil = useSelector((state) => state.ui.perfil); 
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [nuevaClave, setNuevaClave] = useState(undefined);
    const [repitaClave, setRepitaClave] = useState(undefined);
    
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
    const onTextChangeNuevaClave = (e) => setNuevaClave(e.target.value);
    const onTextChangeRepitaClave = (e) => setRepitaClave(e.target.value);            

    


    const onReset = () => {
        setNombre("");
        setCorreo("");
        setId(0);
        setUpdate(false);
        setRepitaClave(undefined);
        setNuevaClave(undefined);
        setNombreGuardar("Guardar") 
    }
    const [state, setState] = useState({
        columns: [ { field: 'nombre', headerName: 'nombre', width: 150 },
        { field: 'correo', headerName: 'correo', width: 150 },
        { field: 'perfil', headerName: 'perfil', width: 150 }],
        rows: [  { id: 1, nombre: '', correo: '', perfil: '' }],
    });
    const [states, setStates] = useState([{label: '', id: 0 }]);
    const [namePerfil, setNamePerfil] = useState(undefined);

    useEffect(() => {
        let isSubscribed = true;
      
        const fetchData = async () => {
          let parameters = {
            "name": "cualquiercosa",
            "parameters": {
                "afn": "select perfilId as id, nombre as label from perfil"
                }
            }
            
        const data = await buscardataService(
            'procedure',
                parameters
        )
        
        if (isSubscribed) {
            dispatch(setPerfilCliente(data.data[0]));
            setStates(data.data[0])
          }
        }
      
        fetchData()
          .catch(console.error);;
        return () => isSubscribed = false;
      }, [])        

        useEffect(() => {
            let isSubscribed = true;
            let where =  perfil[0].Rol === 'GESTOR' ? `where u.usuarioId = ${perfil[0].usuarioId}` : `where u.usuarioId = u.usuarioId`;
            const fetchData = async () => {
              let parameters = {
                "name": "cualquiercosa",
                "parameters": {
                    "afn": `select usuarioId as id,u.nombre, correo, p.nombre as perfil from usuario u inner join perfil p on u.perfilId = p.perfilId ${where}`
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
             alerta(0,'Cliente/Usuario', 'El Cliente/Usuario fue eliminado con exito..')
         } catch (error) {
             onReset()
             alerta(1,'Cliente/Usuario', 'Se genero un problema al eliminar el Cliente/Usuario..')
         }        
    }

    const onSubmit = async () => { 
        try {
           let table = update ? "actualizarUsuario" : "guardarUsuario";
           let parameters = {}

           if(update) {
            if (repitaClave !== undefined && repitaClave !== nuevaClave) {
                alerta(1,'Advertencia', 'La clave no es correcta verifique..');
                return 
            }
            if(namePerfil == undefined &&  perfil[0].Rol === 'ADMIN') {
                alerta(1,'Advertencia', 'Debe selecionar un perfil para poder guardar la información');
                return 
            } else {
                setNamePerfil(perfil[0].perfilId)
            }
            parameters = { 
                "name": table,
            "parameters": {
                "id": Number(id),
                "nombre": nombre,
                "correo": correo,
                "clave": nuevaClave == undefined ? 'wbeimar2013__' : nuevaClave,
                "perfilId": Number(namePerfil)
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
            alerta(0,'Cliente/Usuario', 'El Cliente/Usuario fue generado con exito..')
        } catch (error) {
            onReset()
            alerta(1,'Cliente/Usuario', 'Se genero un problema al guardar el Cliente/Usuario..')
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

    const setNamePerfilOnChange = (e) => {
        setNamePerfil(e)
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
                                        CLIENTE - USUARIO
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
                        {
                            perfil[0].Rol === 'ADMIN' ?
                        <Autocomplete
                            style={{marginTop: '10px', marginBottom: '5px'}}
                            disablePortal
                            id="combo-box-demo"
                            options={states}
                            onChange={(event, newValue) => {
                                setNamePerfilOnChange(newValue);
                            }}
                            sx={{ width: 210 }}
                            renderInput={(params) => <TextField {...params} label="Perfil" />}
                            /> : null
                        }
                         {update ?   <label>
                                <Typography variant="h6" component="h6">Actualizar clave</Typography>
                                <TextField
                                onChange={onTextChangeNuevaClave}
                                value={nuevaClave}
                                label={"nuevaClave"}
                                type="password"
                                />                        
                            </label>  : null}     
                         {update ?           
                            <label>
                                <Typography variant="h6" component="h6">Repita clave</Typography>
                                <TextField
                                onChange={onTextChangeRepitaClave}
                                value={repitaClave}
                                label={"repitaClave"}
                                type="password"
                                />                        
                            </label>
                        : null
                        }
                                                               
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
