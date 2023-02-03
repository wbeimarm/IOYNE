import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Products from '../../vistas/Products';
import { useDispatch, useSelector } from 'react-redux';
import { setUsuarios } from '../../../slices/uiSlice';
import { useAuth } from "../../seguridad/auth";
import AppContext from '../../../context/AppContext'
import { Card, CardContent } from '@mui/material';
import { v4 as uuidv4 } from 'uuid'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import '../../vistas/assets/styles.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const _ = require('underscore')

export default function Cotizacion({ handleAddToCart }) {
  const { state, removeFromCart, addToCart } = useContext(AppContext)
  const { cart } = state  
    const dispatch = useDispatch();
    const { buscardataService } = useAuth();    
    const [states, setStates] = useState([{label: '', id: 0 }]);
    const [nameCliente, setNameCliente] = useState(null);
    let products = useSelector((state) => state.ui.products); 

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

    const setNameClienteOnChange = (e) => {
        setNameCliente(e)
    }

    const handleRemove = (product) => {
      removeFromCart(product)
    }
  
    const handleSumTotal = () => {
      const cantidad = state.cart.length
      let total = 0
      let arrayDescount = []
      for (let n = 0; n < cantidad; n++) {
        arrayDescount.push(state.cart[n].id)
        total += state.cart[n].total
      }
      // const [discountState] = state.discount
      // let exist = discountState.m
      // exist = exist.sort()
      // arrayDescount = arrayDescount.sort()
      // const existForDiscount = _.isEqual(exist, arrayDescount)
      // if (existForDiscount) {
      //   let descuento = (discountState.discount)
      //   descuento = descuento.toFixed(2)
      //   total = total - descuento
      // }
      return total
    }

    const incrementQuantity = (e) => {
      addToCart(e)
      console.log(cart)
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
            <Autocomplete
                style={{marginTop: '10px'}}
                disablePortal
                id="combo-box-demo"
                options={states}
                onChange={(event, newValue) => {
                    setNameClienteOnChange(newValue);
                  }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Cliente" />}
                />
            
            <div className="movies__cart">
              {cart.length > 0 && (
                <div className="movies__cart-total">
                  <p>Total: ${handleSumTotal()}</p>
                </div>
              )}
              <CardContent>
                {cart.map(x => (
                  <Card key={uuidv4()} className="movies__cart-card">
                    <div>
                    <Avatar style={{marginTop: '12px', marginLeft: '12px'}} alt={x.imagen} src={x.imagen}/>
                    </div>
                    <div>Id: {x.productoId}</div>
                    <div> Nombre: {x.nombre}</div>
                    <div>Precio: ${x.valorVenta}</div>
                    <div>Total: ${x.total}</div>
                    <div className="movies__cart-card-quantity">
                      <Button style={{ background: '#C42A58'}}  onClick={()=> handleRemove(x)} variant="contained">-</Button>
                      <span style={{ margin: '18px', fontSize: 'larger'}}>
                        {x.count}
                      </span>
                      <Button  onClick={()=> incrementQuantity(x)} variant="contained">+</Button>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </div>


          </Item>
        </Grid>
      </Grid>
    </Box>
   </>
    )
}