import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../../slices/uiSlice';
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
import axios from "axios";

export default function CrearProductos() {
    const [nombre, setNombre] = useState("");
    const [imagen, setImagen] = useState("");
    const [costo, setCosto] = useState("");
    const [valorventa, setValorVenta] = useState("");
    const [existencia, setExistencia] = useState("");
    const [id, setId] = useState(0);
    const [update, setUpdate] = useState(false);
    const [nombreGuardar, setNombreGuardar] = useState("Guardar");
    
    const [alertmensaje, setAlertmensaje] = useState(false);
    const [alertvaloresmensaje, setAlertvaloresmensaje] = useState({
        type:0,
        nombre:'',
        descripcion: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const { buscardataService } = useAuth();
    const onTextChangeNombre = (e) => setNombre(e.target.value);
    let url_imagen = process.env.URL_IMAGE || 'http://locahost';
    
    const onTextChangeImagen = (e) => {
        const formData = new FormData();
        formData.append("file",e);
        
        axios
          .post(url_imagen, formData)
          .then((res) => {
            setImagen(res.data.link)
            alerta(0,'Imagen', 'La imagen se guardo con exito puede seguir ingresando los otros datos')
          })
          .catch((err) => 
          {
            console.log('err')
            console.log(err)
            alerta(1,'Imagen', 'Se genero un error al guardar la imagen intente en más tarde')
        });
    };
    const onTextChangeCosto = (e) => setCosto(e.target.value);
    const onTextChangeValorVenta = (e) => setValorVenta(e.target.value);
    const onTextChangeExistencia = (e) => setExistencia(e.target.value);
    
    const onReset = () => {
        setNombre("");
        setImagen("");
        setValorVenta("");
        setCosto("");
        setExistencia("");
        setId(0);
        setUpdate(false);
        setNombreGuardar("Guardar")   
    }
    const [state, setState] = useState({
        columns: [ { field: 'nombre', headerName: 'nombre', width: 150 },
        { field: 'imagen', headerName: 'imagen', width: 450 },
        { field: 'costo', headerName: 'costo', width: 150 },
        { field: 'valorVenta', headerName: 'valorVenta', width: 150 },
        { field: 'existencia', headerName: 'existencia', width: 150 },],
        rows: [  { id: 1, nombre: '', imagen: '', costo: '', valorVenta: '', existencia: '' }],
    });

        useEffect(() => {
            let isSubscribed = true;
          
            const fetchData = async () => {
              let parameters = {
                "name": "cualquiercosa",
                "parameters": {
                    "afn": "select productoId as productoId, productoId as id,nombre, imagen, costo,valorVenta,existencia,estado from producto"
                    }
                }
              
            const data = await buscardataService(
                'procedure',
                    parameters
            )
            
            if (isSubscribed) {
                dispatch(setProducts(data.data[0]));
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
             "name": "eliminarProducto",
             "parameters": {
                 "id": Number(id)
                 }
             }
           
             const data = await buscardataService(
                 'procedure',
                  parameters
             )
             dispatch(setProducts(data.data[0]))
             sessionStorage.setItem("productos", JSON.stringify(data.data[0]));
             setState({
                 columns: state.columns, 
                 rows: data.data[0]})   
             onReset()
             alerta(0,'Producto', 'El producto fue eliminado con exito..')
         } catch (error) {
             onReset()
             alerta(1,'Producto', 'Se genero un problema al eliminar el producto..')
         }        
    }

    const onSubmit = async () => { 
        try {
           let table = update ? "actualizarProducto" : "guardarProducto";
           let parameters = {}
           if(update) {
            parameters = { 
                "name": table,
            "parameters": {
                "id": Number(id),
                "nombre": nombre,
                "imagen": imagen,
                "costo": Number(costo),
                "valorventa": Number(valorventa),
                "existencia": Number(existencia),
                }
            }
           } else  {
            parameters = { 
                "name": table,
            "parameters": {
                "nombre": nombre,
                "imagen": imagen,
                "costo": Number(costo),
                "valorventa": Number(valorventa),
                "existencia": Number(existencia),
                }
            }            
           }           

            const data = await buscardataService(
                'procedure',
                 parameters
            )
            dispatch(setProducts(data.data[0]))
            sessionStorage.setItem("productos", JSON.stringify(data.data[0]));
            setState({
                columns: state.columns, 
                rows: data.data[0]})   
            onReset()
            alerta(0,'Productos', 'El producto fue generado con exito..')
        } catch (error) {
            onReset()
            alerta(1,'Productos', 'Se genero un problema al guardar el producto..')
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
        setImagen(e.row.imagen); 
        setValorVenta(e.row.valorVenta); 
        setCosto(e.row.costo); 
        setExistencia(e.row.existencia); 
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
                        <div  style={{ fontSize: "12px", textAlign: "center", marginBottom: "12px", marginTop: "5px"}}>
                                        PRODUCTOS
                        </div>
                       
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '25ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                                 <div>
                        <label>
                            <Typography variant="h6" component="h6">nombre</Typography>
                            <TextField
                            onChange={onTextChangeNombre}
                            value={nombre}
                            label={"Nombre"}
                            />                        
                        </label>
                         <input
                            type="file"
                            value={selectedFile}
                            onChange={(e) => onTextChangeImagen(e.target.files[0])}
                            />
                        </div>
                         
                          <div>
                        <label>
                            <Typography variant="h6" component="h6">costo</Typography>
                            <TextField
                            onChange={onTextChangeCosto}
                            value={costo}
                            label={"costo"}
                            />                        
                        </label>   
                        <label>
                            <Typography variant="h6" component="h6">valor Venta</Typography>
                            <TextField
                            onChange={onTextChangeValorVenta}
                            value={valorventa}
                            label={"valorventa"}
                            />                        
                        </label>
                        
                        <label>
                            <Typography variant="h6" component="h6">existencia</Typography>
                            <TextField
                            onChange={onTextChangeExistencia}
                            value={existencia}
                            label={"existencia"}
                            />                        
                        </label>  
                        </div>   
                                </Box>
                       
                                                                                   
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
