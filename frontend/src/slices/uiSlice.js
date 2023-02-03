import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  token: null,
  perfil: null,
  rutas: null,
  products: [],
  usuarios: [],
  cotizaciones: [],
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
    }        
  },
});

export const { setToken, setPerfil, setRutas, setProducts ,setUsuarios, setCotizaciones } = uiSlice.actions;

export default uiSlice.reducer;
