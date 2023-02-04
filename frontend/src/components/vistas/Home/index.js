import React, { useContext, useEffect, useState } from 'react';
import Base from '../../layout/Base/normal';
import Products from '../Products'
import { useSelector, useDispatch } from "react-redux";
import { Chart } from "react-google-charts";
import { setCotizaciones } from '../../../slices/uiSlice';
import { useAuth } from "../../seguridad/auth";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';




//   if(actualizando) {
//     // dispatch(setCart(data.data[0]))
//     addToCart(data.data[0])
//   }
//   dispatch(setCotizaciones(data.data[0]))
//   sessionStorage.setItem("cotizaciones", JSON.stringify(data.data[0]));
//   setStateGrid({
//       columns: stateGrid.columns, 
//       rows: data.data[0]})

export default function Home() {
    // let products = useSelector((state) => state.ui.products); 
    const dispatch = useDispatch();
    const { buscardataService } = useAuth(); 
    const [dataGrafica, setDataGrafica] = useState([[]])
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
                "afn": "select c.cotizacionPorUsuarioId as id,p.nombre,cantidad as count,valorUnitario as valorVenta,descuento,consecutivo,fecha,c.productoId,c.usuarioId, u.nombre as cliente,case when c.estado = 1 then 'GENERADA' else 'COBRADA' end as estados, c.estado,p.existencia,p.imagen from cotizacionPorUsuario c inner join producto p on c.productoId = p.productoId inner join usuario u on u.usuarioId = c.usuarioId"
                }
            }
          
        const data = await buscardataService(
            'procedure',
                parameters
        )
        
        if (isSubscribed) {
            dispatch(setCotizaciones(data.data[0]));
            setStateGrid({
                columns: stateGrid.columns, 
                rows: data.data[0]})   
          }
          console.log(data.data[0])
          setDataGrafica(
                            [
                    ['nombre', 'count', 'valorVenta'],
                    ...data.data[0].map(d => [ d.nombre, d.count, d.valorVenta ])
                ]
            )
        }
      
        fetchData()
          .catch(console.error);;
        return () => isSubscribed = false;
      }, [])  

      const onClickGrid = (e) => {}   
      

    return (
        <Base>
              <Chart
                chartType="BarChart"
                width="100%"
                height="400px"
                data={dataGrafica}
                options={options}
                />
        <Chart
            chartType="PieChart"
            data={dataGrafica}
            options={options}
            width={"100%"}
            height={"400px"}
            />


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
            {/* <Products products={products} /> */}
        </Base>
    )
}

  export const options = {
    title: "Cotizaciones Generadas",
  };