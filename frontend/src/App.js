import "./App.css";
import ResponsiveAppBar from "./components/nav/Nav";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { green, purple } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  }
});

import Home from "./components/vistas/Home";
import Usuario from "./components/vistas/Usuario";
import Cotizacion from "./components/vistas/Cotizacion";
import CrearProductos from "./components/vistas/CrearProductos";
import Login from "./components/seguridad/Login";
import Logout from "./components/seguridad/Logout";
import AppContext from './context/AppContext'
import useInitialState from './hooks/useInitialState'

function App() {
  const initialState = useInitialState()
  return (
      <ThemeProvider theme={theme}>
          <div className="App">
          <AppContext.Provider value={initialState}>
            <BrowserRouter>
              <ResponsiveAppBar />
              <Routes>
                <Route path="/" element={<Home />} /> 
                <Route path="/Home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Logout" element={<Logout />} />
                <Route path="/Cliente" element={<Usuario />} />
                <Route path="/Cotizacion" element={<Cotizacion />} />
                <Route path="/CrearProductos" element={<CrearProductos />} />
              </Routes>
            </BrowserRouter>
          </AppContext.Provider>
          </div>
      </ThemeProvider>
  );
}

export default App;
