import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Products from '../../vistas/Products';
import { useDispatch, useSelector } from 'react-redux';
import { setUsuarios } from '../../../slices/uiSlice';
import { useAuth } from "../../seguridad/auth";
import AppContext from '../../../context/AppContext'
import { Card } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import {  Button, Typography } from '@mui/material';
import Alerts from '../../utils/Alerts';
import Divider from '@mui/material/Divider';
import '../../vistas/assets/Styles.css'
import { setCotizaciones } from '../../../slices/uiSlice';
import { DataGrid } from '@mui/x-data-grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const _ = require('underscore')

export default function Cotizacion({ handleAddToCart }) {
    const { state, removeFromCart, addToCart, removeState } = useContext(AppContext)
    let { cart } = state
 
    const dispatch = useDispatch();
    const { buscardataService } = useAuth();    
    const [states, setStates] = useState([{label: '', id: 0 }]);
    const [nameCliente, setNameCliente] = useState(undefined);
    const [alertmensaje, setAlertmensaje] = useState(false);
    const [consecutivo, setConsecutivo] = useState(undefined);
    const [descuento, setDescuento] = useState(undefined);
    const onTextChangConsecutivo = (e) => {
      setConsecutivo(e.target.value);            
    }
    const [alertvaloresmensaje, setAlertvaloresmensaje] = useState({
        type:0,
        nombre:'',
        descripcion: ''
    });    
    let products = useSelector((state) => state.ui.products);
    const [stateGrid, setStateGrid] = useState({
      columns: [ { field: 'nombre', headerName: 'nombre', width: 150 },
      { field: 'count', headerName: 'count', width: 150 },
      { field: 'valorVenta', headerName: 'valorVenta', width: 150 },
      { field: 'descuento', headerName: 'descuento', width: 150 },
      { field: 'consecutivo', headerName: 'consecutivo', width: 150 },
      { field: 'fecha', headerName: 'fecha', width: 150 },
      { field: 'estado', headerName: 'estado', width: 150 },
      { field: 'cliente', headerName: 'cliente', width: 150 },
      { field: 'productoId', headerName: 'productoId', width: 150 },
      { field: 'usuarioId', headerName: 'usuarioId', width: 150 },
     ],
      rows: [  { id: 1, nombre: '', count: '', valorVenta: '', descuento: '', consecutivo: '',
                 fecha: '', estado: '', cliente: '', productoId: '', usuarioId: '' }],
  });
  
  
    useEffect(() => {
        let isSubscribed = true;
      
        const fetchData = async () => {
          let parameters = {
            "name": "cualquiercosa",
            "parameters": {
                "afn": "select usuarioId as id, nombre as label from usuario where perfilId not in (select perfilId from perfil where nombre in('ADMIN','GESTOR'))"
                }
            }
            
        const data = await buscardataService(
            'procedure',
                parameters
        )
        
        if (isSubscribed) {
            dispatch(setUsuarios(data.data[0]));
            setStates(data.data[0])
          }
        }
      
        fetchData()
          .catch(console.error);;
        return () => isSubscribed = false;
      }, [])    

      useEffect(() => {
        let isSubscribed = true;
      
        const fetchData = async () => {
          let parameters = {
            "name": "cualquiercosa",
            "parameters": {
                "afn": "select descuento, tipoDescuento, valorDescuento from parametroGeneral"
                }
            }
            
        const data = await buscardataService(
            'procedure',
                parameters
        )
        
        if (isSubscribed) {
          setDescuento(data.data[0])
          }
        }
      
        fetchData()
          .catch(console.error);;
        return () => isSubscribed = false;
      }, [])    


    const setNameClienteOnChange = (e) => {
        if(e != null) {
          onReset()
          setNameCliente(e)
          buscarCotizacionPorCliente(e.id, 'id', false)
          handleSumTotal()
          if(consecutivo === undefined){
            let consecutivos = uuidv4();
            setConsecutivo(consecutivos)
          }
        }
        
    }

    const buscarCotizacionPorCliente = async (id, queHago, actualizando) => {
        let where = queHago === 'id' ? `where u.usuarioId = ${id}` : `where consecutivo= ${id}`
        let parameters = {
          "name": "cualquiercosa",
          "parameters": {
              "afn": `select c.cotizacionPorUsuarioId as id,p.nombre,cantidad as count,valorUnitario as valorVenta,descuento,consecutivo,fecha,c.productoId,c.usuarioId, u.nombre as cliente,case when c.estado = 1 then 'GENERADA' else 'COBRADA' end as estados, c.estado,p.existencia,p.imagen from cotizacionPorUsuario c inner join producto p on c.productoId = p.productoId inner join usuario u on u.usuarioId = c.usuarioId ${where}`
              }
          }
          
      const data = await buscardataService(
          'procedure',
              parameters
      )
      
      if(actualizando) {
        addToCart(data.data[0])
      }
      dispatch(setCotizaciones(data.data[0]))
      sessionStorage.setItem("cotizaciones", JSON.stringify(data.data[0]));
      setStateGrid({
          columns: stateGrid.columns, 
          rows: data.data[0]})                        
    }
 
    const handleRemove = (product) => {
      removeFromCart(product)
    }
  
    const handleSumTotal = () => {
      const cantidad = state.cart.length
      let total = 0
      let arrayDescount = []
      for (let n = 0; n < cantidad; n++) {
        arrayDescount.push(state.cart[n].productoId)
        total += state.cart[n].valorVenta *  state.cart[n].count
      }
      let descount = 0
      if(descuento !== undefined && descuento.length> 0 && descuento[0].descuento){
        descount = descuento[0].tipoDescuento ? total*(descuento[0].valorDescuento/100) : descuento[0].valorDescuento;
      }
      descount = descount.toFixed(2)
      total = total - descount
      return total
    }


    const incrementQuantity = (e) => {
      addToCart(e)
    }

    const guardarCotizacionHandler = async () => {
      if(nameCliente == undefined) {
        alerta(1,'Advertencia', 'Debe selecionar un cliente para poder guardar la cotización');
      } else {
          let cantidad = cart.length;
          if( cantidad === 0) {
            alerta(1,'Advertencia', 'Debe selecionar un producto para poder guardar la cotización');
            return 
          }
          if(consecutivo === undefined){
            let consecutivos = uuidv4();
            setConsecutivo(consecutivos)
          }
          for(let i =0; i < cart.length;i++) {
            try {
              let parameters = {
                "name": "guardarCotizacion",
                "parameters": {
                    "consecutivo": consecutivo.substring(0, 30),
                    "usuarioId":nameCliente.id,
                    "productoId":Number(cart[i].productoId),
                    "cantidad": Number(cart[i].count),
                    "valorUnitario":Number(cart[i].valorVenta),
                    "descuento":0
                    }
                }
                const data = await buscardataService(
                    'procedure',
                     parameters
                )
                dispatch(setCotizaciones(data.data[0]))
                sessionStorage.setItem("cotizaciones", JSON.stringify(data.data[0]));
                setStateGrid({
                    columns: stateGrid.columns, 
                    rows: data.data[0]})   
                if( cantidad - 1=== i) {
                  onReset()
                  setConsecutivo(undefined)
                  alerta(0,'Cotización', 'La cotización fue guardada con exito..')
                }
            } catch (error) {
                onReset()
                alerta(1,'Cotización', 'Se genero un problema al guardar la cotización..')
            }  
          }
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

  const onReset = () => {
    removeState(cart)
  }
 
  const onClickGrid = (e) => {
    alerta(1,'Advertencia', 'La forma de actualizar una cotización se encuentra en desarrollo');
  }

    return (
        <>
          <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Item className="container">
                <Products products={products} handleAddToCart={handleAddToCart}  />
              </Item>
           </Grid>
        <Grid item xs={4}>
          <Item>
            { alertmensaje ? <Alerts type={alertvaloresmensaje.type} name={alertvaloresmensaje.nombre} descripcion={alertvaloresmensaje.descripcion} /> : null}
            <Autocomplete
                style={{marginTop: '10px', marginBottom: '5px'}}
                disablePortal
                id="combo-box-demo"
                options={states}
                onChange={(event, newValue) => {
                    setNameClienteOnChange(newValue);
                  }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Cliente" />}
                />
                <div >
                <div >
                  {cart.length > 0 && (
                  <div >
                    <p>Total: ${handleSumTotal()}</p>
                  </div>
                  )}
                  <Button style={{ marginBottom: '10px'}}  onClick={()=> guardarCotizacionHandler()} variant="contained">Guardar</Button>
                </div>
                <label>
                          <TextField
                            onChange={onTextChangConsecutivo}
                            value={consecutivo}
                            label=""
                            />                        
                        </label>
                {cart.map(x => (
                  <Card key={uuidv4()}>
                     <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Avatar style={{marginTop: '12px', marginLeft: '12px'}} alt={x.imagen} src={x.imagen}/>
                      </Grid>
                      <Grid item xs={8}>
                        <div style={{float:'left', marginTop: '8px', paddingRight:'20px'}}><p>{x.nombre}</p>  Precio: ${x.valorVenta} Total: ${x.total}</div>
                      </Grid>
                    </Grid>
                    
                    <div>
                      <Button style={{ background: '#C42A58', marginBottom:'5px' , fontWeight: "bold"}}  onClick={()=> handleRemove(x)} variant="contained">-</Button>
                      <span style={{ margin: '18px', fontSize: 'larger'}}>
                        {x.count}
                      </span>
                      <Button style={{ marginBottom:'5px', fontWeight: "bold"}}  onClick={()=> incrementQuantity(x)} variant="contained">+</Button>
                    </div>
                    <Divider />
                  </Card>
                ))}
            </div>
            <Typography variant="h6" component="h6">Cotizaciones</Typography>
            <Box sx={{ height: 400, width: '100%', marginTop: '12px' }}>
              <div style={{ display: 'flex', height: '100%', width: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                      <DataGrid  onCellClick={(event) => {
                      onClickGrid(event);
                  }} rows={stateGrid.rows} columns={stateGrid.columns}  pagination pageSize={4}
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
          </Item>
        </Grid>
      </Grid>
    </Box>
   </>
    )
}