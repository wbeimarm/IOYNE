import { createSlice, current  } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  token: null,
  perfil: null,
  perfilCliente: null,
  rutas: null,
  products: [],
  usuarios: [],
  cotizaciones: [],
  cart: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setPerfil: (state, action) => {
      state.perfil = action.payload;
    },
    setPerfilCliente: (state, action) => {
      state.perfilCliente = action.payload;
    },    
    setRutas: (state, action) => {
      state.rutas = action.payload;
    },
    setProducts: (state, action ) => {
      state.products = action.payload;
    },
    setUsuarios: (state, action ) => {
      state.usuarios = action.payload;
    },
    setCotizaciones: (state, action ) => {
      state.cotizaciones = action.payload;
    },
    setCart: (state, action ) => {
      state.cart = action.payload;
    },
    setRemoveCart: (state, action) => {
      state.cart = [];
    }              
  },
});

export const { setToken, setPerfil, setRutas, setProducts ,setUsuarios, setCotizaciones, setCart , setRemoveCart, setPerfilCliente } = uiSlice.actions;

export default uiSlice.reducer;
